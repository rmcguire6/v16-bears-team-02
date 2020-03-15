import React from 'react';
import ReactDOM from 'react-dom';
// need connect function to be able to connect to store from Provider
import {connect} from 'react-redux';
import { storeCurrentMonth, storeCurrentYear, storeCurrentDate, storeCurrentWeek } from '../actions/calendarActions';

import { getCurrentMonth, getCurrentYear, getCurrentDate, getFirstDay, getLastFullDate, getNumberOfWeeks, createWeek, populateDays } from './Functions';


class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.getCurrentMonth = getCurrentMonth.bind(this);
        this.getCurrentYear = getCurrentYear.bind(this);
        this.getCurrentDate = getCurrentDate.bind(this);
        this.getFirstDay = getFirstDay.bind(this);
        this.getLastFullDate = getLastFullDate.bind(this);
        this.getNumberOfWeeks = getNumberOfWeeks.bind(this);
        this.populateDates = this.populateDates.bind(this);
        this.populateDays = populateDays.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.getParentData = this.getParentData.bind(this);
        this.createWeek = createWeek.bind(this);
        this.months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'
        ];
        
    }

    componentDidMount() {
        if(this.props.currentMonth === null && this.props.currentYear === null && this.props.currentDate === null) {
            this.getCurrentMonth();
            this.getCurrentYear();
            this.getCurrentDate();
            this.getLastFullDate();
            this.getNumberOfWeeks();
            this.populateDates();
            this.createWeek();
        }
    }

    populateDates() {
        console.log('populateDates');
        const allWeeks = this.createWeek();
        const lastDate = (this.getLastFullDate()).getDate();
        const firstDay = this.getFirstDay();
        const allWeeksElem = allWeeks.map((week, index) => {
            return React.createElement('tr', {id: `week-${index}`, 'data-weeknumber': index}, 
                week.map((day, ind) => {
                    // if(day >= firstDay && day <= firstDay + lastDate && day !== '') {
                    if(day !== '') {
                        return React.createElement('td', {key: `td-${ind}`, onClick: this.getParentData},day)
                    } else {
                        return React.createElement('td', {key: `td-${ind}`}, day)
                    }
                    
                })
            );

        })
        return allWeeksElem;
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

        let lastDate = this.getLastDate(month);
        if(lastDate <= this.props.currentDate) {
            this.props.storeCurrentDateToState(lastDate);
        };



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

        let lastDate = this.getLastDate(month);
        if(lastDate <= this.props.currentDate) {
            this.props.storeCurrentDateToState(lastDate);
        };


        this.props.storeCurrentMonthToState(month);
    }

    getLastDate(month) {
        // if previous month's last date > this month's last date
        // e.g. May 31st to April 30th
        let nextMonth = month + 1;
        let nextMonthFullDate = (new Date(`${nextMonth + 1}/1/${this.props.currentYear}`));
        let lastFullDate =  (new Date(nextMonthFullDate.setDate(0)));
        let lastDate = lastFullDate.getDate();
        return lastDate;

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
        const date = parseInt(e.currentTarget.innerText);
        this.props.storeCurrentWeekToState(parentId);
        console.log('e.currentTarget', date);
        this.props.storeCurrentDateToState(date);
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
                        <tr id='weekdays' colSpan='7'>
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