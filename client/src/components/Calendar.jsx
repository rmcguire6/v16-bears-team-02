import React from 'react';
import ReactDOM from 'react-dom';
// need connect function to be able to connect to store from Provider
import {connect} from 'react-redux';
import { storeCurrentMonth, storeCurrentYear, storeCurrentDate, storeCurrentWeek } from '../actions/calendarActions';

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.getCurrentMonth = this.getCurrentMonth.bind(this);
        this.getCurrentYear = this.getCurrentYear.bind(this);
        this.getCurrentDate = this.getCurrentDate.bind(this);
        this.getFirstDay = this.getFirstDay.bind(this);
        this.getLastFullDate = this.getLastFullDate.bind(this);
        this.getNumberOfWeeks = this.getNumberOfWeeks.bind(this);
        this.populateDates = this.populateDates.bind(this);
        this.populateDays = this.populateDays.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.initFunctions = this.initFunctions.bind(this);
        this.passRefToWeek = this.passRefToWeek.bind(this);
        this.getParentData = this.getParentData.bind(this);
        this.cloneThis = this.cloneThis.bind(this);
        this.days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ];

        // for use with week. create a reference for a single week then forward the ref to Week component for display.
        // max possible # of weeks in any given month is 6
        // for(let i = 1; i <= 6; i++) {
        //     this[`week${i}ref`] = React.createRef();
        // }

        // this.myRef = React.createRef();
        
    }

    componentDidMount() {
        if(this.props.currentMonth === null && this.props.currentYear === null && this.props.currentDate === null) {
            this.getCurrentMonth();
            this.getCurrentYear();
            this.getCurrentDate();
            this.getLastFullDate();
            this.getNumberOfWeeks();
            this.populateDates();
            this.initFunctions();
            this.cloneThis();
        }
    }

    // run these functions when component is loaded
    initFunctions() {
        console.log('init fired!');

    }

    // use react.createelement to dynamically add elements in page
    // need to use this for # of weeks / tr
    // {React.createElement('th', {}, 'created element')}

    populateDays() {
        console.log('populateDays');
        let tabledays = [];
        for(let i in this.days) {
            tabledays.push(React.createElement('td', {key: `${this.days[i]}-${i}` }, this.days[i]));
        }
        return (
            tabledays
        );
    }

    // make nested array with the weeks in it
    // [[week1],[week2], [week3], [week4]]
    // where week1 = ['','','','1','2','3','4']
    // when 1st of the month falls on a wednesday
    // [tr,tr,tr,tr]
    // tr = [td,td,td,td,td,td,td]
    populateDates() {
        console.log('populateDates');
        let allWeeks = [];
        let week = [];
        let dateNumber = 1; // date counter
        let weekNumber = 1; // first week
        let lastFullDate = this.getLastFullDate();
        let lastDate = lastFullDate.getDate();
        let weekCount = this.getNumberOfWeeks();
        let firstDay = this.getFirstDay();
        let tdCount = weekCount * 7;
        let dateCount = 0; //date counter
        // create elements inside week. always will have 7 tds.
        for (let i = 0; i <= tdCount; i++) {
            let elem = React.createElement('td', {key: `td-${i}`},'')
            if(i >= firstDay && i <= firstDay + lastDate - 1) {
                elem = React.createElement('td', {key: `td-${i}`, onClick: this.getParentData},dateNumber)
                dateNumber++;
            }
            week.push(elem)
        }

        for(let i = weekNumber; i <= weekCount; i++) {
            let elem = React.createElement('tr', {id: `week-${i}`, 'data-weeknumber': i
            // , ref: this[`week${i}ref`]
        },
            week[dateCount],
            week[dateCount+1],
            week[dateCount+2],
            week[dateCount+3],
            week[dateCount+4],
            week[dateCount+5],
            week[dateCount+6],
            )
            allWeeks.push(elem);
            dateCount+=7;
        }
        return allWeeks;
    }

    getCurrentMonth() {
        console.log('getCurrentMonth');
        let month;
        if(this.props.currentMonth !== null) {
            month = this.props.currentMonth;
        } else {
            month = (new Date()).getMonth();
            this.props.storeCurrentMonthToState(month);
        }
        return month;
    }

    getCurrentYear() {
        console.log('getCurrentYear');
        let year;
        if(this.props.currentYear !== null) {
            year = this.props.currentYear;
        } else {
            year = (new Date()).getFullYear();
            this.props.storeCurrentYearToState(year);
        }
        return year;
    }

    getCurrentDate() {
        console.log('getCurrentDate');
        let date;
        if(this.props.currentDate !== null) {
            date = this.props.currentDate;
        } else {
            date = (new Date()).getDate();
            this.props.storeCurrentDateToState(date);
        }
        return date;
    }


    // last date of any given month is
    // 1st date of next month - 1
    // need current year
    getLastFullDate() {
        console.log('getLastFullDate');
        let currentMonth = this.props.currentMonth || this.getCurrentMonth();
        let currentYear = currentMonth === 11 ? // if december, make it new year
            (this.props.currentYear  || this.getCurrentYear()) + 1 
            : (this.props.currentYear  || this.getCurrentYear());
        let nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        // add 1 to nextMonth to get exact month
        // because months array is zero-based
        // thus, 0 is january but 1/1 is january 1st in date format
        let nextMonthFullDate = (new Date(`${nextMonth + 1}/1/${currentYear}`));
        let lastFullDate =  (new Date(nextMonthFullDate.setDate(0)));
        return lastFullDate;
    }

    // get first day of the month
    getFirstDay() {
        console.log('getFirstDay');
        let month = this.getCurrentMonth() + 1;
        let currentYear = this.getCurrentYear();
        let firstDate = (new Date(`${month}/1/${currentYear}`));
        let firstDay = firstDate.getDay();
        return firstDay;
    }


    //get # of weeks
    // count 2 weeks straight off-the-bat. 1st week where first date of month is.
    // 2nd week is where last date of month is.
    // take first date of the last week, subtract 1 to get the last date of the week before
    // i.e. if 27 is first date of last week, then the 26th is the last date of the week before
    // after getting that date, look for the last date of the first week
    // then subtract that from the last date of 2nd-to-the-last week
    getNumberOfWeeks() {
        console.log('getNumberOfWeeks');
        let weekCount = 2;
        let lastFullDate = this.getLastFullDate();
        let lastDate = lastFullDate.getDate();
        let lastDay = lastFullDate.getDay();
        let a = lastDate - lastDay;
        let firstDay = this.getFirstDay();
        let b = 1 + (6 - firstDay);
        weekCount += (a - b - 1)/7
        return weekCount;
    }

    //next month and previous month
    prevMonth() {
        console.log('prevMonth');
        let month = this.props.currentMonth;
        let year = this.props.currentYear;
        if(month === 0) {
            month = 11;
            year--;
            this.props.storeCurrentYearToState(year);          
        } 
        else {
            month--;
        }
        this.props.storeCurrentMonthToState(month); 
        
    }

    nextMonth() {
        console.log('nextMonth');
        let month = this.props.currentMonth;
        let year = this.props.currentYear;
        if(month === 11) {
            month = 0;
            year++;
            this.props.storeCurrentYearToState(year);
        }
        else {
            month++;
        } 
        this.props.storeCurrentMonthToState(month);
    }
        
    // add prevMonth, nextMonth to mousedown, touchstart events
    holdBtns() {
        const events = ['mousedown', 'touchstart'];
        const prevMonth = document.getElementById('prev-month');
        const nextMonth = document.getElementById('next-month');
        const holdThis = () => {
            
        }
        events.forEach( event => {
            prevMonth.addEventListener(event, holdThis);
            nextMonth.addEventListener(event, holdThis);
        });
    }

    // pass ref property to tr (parent node of date)
    getParentData(e) {
        const parentId = e.currentTarget.parentNode.id;
        // return parentId;
        // this.passRefToWeek(parentNode);    
        // console.log(parentNode);
        this.props.storeCurrentWeekToState(parentId);
    }

    passRefToWeek(parentNode) {
        // parentNode.setAttribute('ref', this.myRef);
        // console.log(this[`week${parentNode}ref`]);
    }

    cloneThis() {
        // let a = document.createElement('table');
        // let c = document.getElementById('copy')
        // c.appendChild((document.getElementById('week-1')).cloneNode(true));
        // // a.innerHTML = b;
        // let c = this.week1ref.current;
        // console.log(a);

        // a.push(this.week1ref.current);
        // this.week1ref.current
        // let y = React.createElement('div', null, a);
        // let x = React.cloneElement(y);
        // console.log('this is x', x);
        // return c;
    }



    render() {
        return (
            <div>
                <button id='prev-month' onClick={this.prevMonth}>Prev</button>
                <button id='next-month' onClick={this.nextMonth}>Next</button>
                <table id='calendar'>
                    <thead>
                        <tr>
                            <th colSpan='7'>
                                {this.months[this.props.currentMonth]} {this.props.currentYear}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id='weekdays'>
                            {this.populateDays()}
                        </tr>
                        {this.populateDates()}
                    </tbody>
                </table>
            </div>

        );
    }
}


// note: mapStateToProps won't be called if state is the same.
const mapStateToProps = (state) => {
    console.log('state in Calendar mapstatetoprops is ', state);
    return state.calendar;
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        storeCurrentMonthToState: (month) => {
            console.log('storeCurrentMonthToState');
            dispatch(storeCurrentMonth(month));
        },
        storeCurrentYearToState: (year) => {
            console.log('storeCurrentYearToState');
            dispatch(storeCurrentYear(year));
        },
        storeCurrentDateToState: (date) => {
            console.log('storeCurrentDateToState');
            dispatch(storeCurrentDate(date));
        },
        storeCurrentWeekToState: (week) => {
            console.log('storeCurrentWeekToState');
            dispatch(storeCurrentWeek(week));
        }
    }
};



// https://medium.com/@mehran.khan/using-refs-with-react-redux-6-how-to-use-refs-on-connected-components-4b80d4ea7300
// const Container = connect(mapStateToProps, mapDispatchToProps, null, {forwardRef:true})(Calendar);

const Container = connect(mapStateToProps, mapDispatchToProps)(Calendar);

export default Container;