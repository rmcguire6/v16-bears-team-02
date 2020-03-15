import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { storeCurrentWeek } from '../actions/calendarActions';
import { getCurrentMonth, getCurrentYear, getCurrentDate, getFirstDay, getLastFullDate, getNumberOfWeeks, createWeek, populateDays } from './Functions';
const merge = require('deepmerge');

class Week extends React.Component {
    constructor(props) {
        super(props);
        // this.getCurrentWeek = this.getCurrentWeek.bind(this);
        this.getCurrentMonth = getCurrentMonth.bind(this);
        this.getCurrentYear = getCurrentYear.bind(this);
        this.getCurrentDate = getCurrentDate.bind(this);
        this.getFirstDay = getFirstDay.bind(this);
        this.getLastFullDate = getLastFullDate.bind(this);
        this.getNumberOfWeeks = getNumberOfWeeks.bind(this);
        this.createWeek = createWeek.bind(this);
        this.populateDays = populateDays.bind(this);
        // this.populateWeek = this.populateWeek.bind(this);
        // this.populateTimes = this.populateTimes.bind(this);
        this.state = {
            isMouseDown: 0,
            availability: {}
        };
    }

    componentDidMount() {
        this.populateWeek();
        this.attachEvents();
    }

    getCurrentWeek = () => {
        console.log('getCurrentWeek');
        const currentDate = this.props.currentDate || (new Date()).getDate();
        const allWeeks = this.createWeek();
        let week = allWeeks.find((arr) => {
            return arr === (arr.find((d) => {
                return d === currentDate
            }) ? arr : 'error' )

        });
        return week;

    }

    populateWeek = () => {
        let week = this.getCurrentWeek();
        let a = React.createElement('tr', {colSpan: '7'}, 
            React.createElement('td', {}, 'Times'),
            week.map((day, index) => {
            return React.createElement('td', {className: `${this.props.currentMonth}-${day}`}, day)
        }));
        return a;
    }

    populateTimes =() => {
        const format = ['AM', 'PM'];
        const times = [12,1,2,3,4,5,6,7,8,9,10,11];
        const timeList = (format.map((meridiem) => { return times.map((hour) => { return `${hour} ${meridiem}`})})).flat();
        let week = this.getCurrentWeek();
        let timeSlots = timeList.map((t) => {
            let slot = React.createElement('td', {}, t);
            return React.createElement(
                'tr', {}, 
                [
                    slot, 
                    week.map((l) => React.createElement(
                        'td', 
                        {   className:'week-times', 
                            'data-date': l, 
                            'data-time': t,
                        }, 
                        React.createElement('span', {}, '')))
                ]
                );
        });
    
        return timeSlots;
    }

    attachEvents = () => {
        let weekTimes = document.getElementsByClassName('week-times');

        Array.from(weekTimes).forEach((element) => {
            element.addEventListener('mousedown', (e) => {
                let selectedDate = e.currentTarget.dataset.date;
                let selectedTime = [e.currentTarget.dataset.time];
                let selectedMonth = this.props.currentMonth;
                let selectedYear = this.props.currentYear;
                let selectedAll = {};
                let oldState = this.state.availability;
                let newState = {};
                if(this.state.isMouseDown === 0) {
                    this.setState({ isMouseDown: 1 });
                };
                console.log('mousedown');
                selectedAll = this.setValueToField([selectedYear, selectedMonth, selectedDate], selectedTime);
                newState = merge(selectedAll, oldState, {arrayMerge: this.combineMerge});
                this.setState({
                    availability: newState
                });

                e.target.classList.add('selected');
            });

            element.addEventListener('mouseenter', (e) => {
                let selectedDate = e.currentTarget.dataset.date;
                let selectedTime = [e.currentTarget.dataset.time];
                let selectedMonth = this.props.currentMonth;
                let selectedYear = this.props.currentYear;
                let selectedAll = {};
                let oldState = this.state.availability;
                let newState = {};
                if(this.state.isMouseDown === 1) {
                    console.log('mouseenter');
                    selectedAll = this.setValueToField([selectedYear, selectedMonth, selectedDate], selectedTime);
                    newState = merge(selectedAll, oldState, {arrayMerge: this.combineMerge});
                    this.setState({
                        availability: newState
                    });
                    console.log('availability is ',this.state.availability);
                    e.target.classList.add('selected');
                };
            });

            // element.addEventListener('dragstart', (e) => {
            //     e.preventDefault();
            //     e.target.style.backgroundColor = 'red';
            // });

            // element.addEventListener('dragenter', (e) => {
            //     e.preventDefault();
            //     e.target.style.backgroundColor = 'red';
            // });

        });

        document.addEventListener('mouseup', () => {
            this.setState({
                isMouseDown: 0
            });
        });

        
    }

    // https://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by/48751698
    setValueToField = (fields, value) => {
        const reducer = (acc, item, index, arr) => ({ [item]: index + 1 < arr.length ? acc : value });
        let result = fields.reduceRight(reducer, {});
        return result;
    };


    combineMerge = (target, source, options) => {
        const destination = target.slice();
    
        source.forEach((item, index) => {
            if (typeof destination[index] === 'undefined') {
                destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
            } else if (options.isMergeableObject(item)) {
                destination[index] = merge(target[index], item, options);
            } else if (target.indexOf(item) === -1) {
                destination.push(item);
            }
        })
        return destination;
    }

    

    render() {
        return (
            <div id="week"> 
               <table>
                    <thead>
                        <tr>
                            <th colSpan='7'>
                                Week
                            </th>
                        </tr>
                    </thead>
                    <tbody id='copy'>
                        <tr colSpan='8'>
                            <td>
                            </td>
                            {this.populateDays()}
                        </tr>
                        {this.populateWeek()}
                        {this.populateTimes()}
                        <button>Submit</button>
                    </tbody>
               </table>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('state in Week mapstatetoprops is ', state.calendar);
    return state.calendar;
};

const mapDispatchToProps = (dispatch) => {
    return {
        storeCurrentWeekToState: (week) => {
            console.log('storeCurrentWeekToState');
            dispatch(storeCurrentWeek(week));
        }
    }
};


// export default withRouter(Week);
// export default React.forwardRef((props,ref) => <Week {...props} ref={ref} />);

const Container = connect(mapStateToProps, mapDispatchToProps)(Week);
export default Container;