import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { storeCurrentWeek } from '../actions/calendarActions';
import { getCurrentMonth, getCurrentYear, getCurrentDate, getFirstDay, getLastFullDate, getNumberOfWeeks, createWeek, populateDays } from './Functions';

class Week extends React.Component {
    constructor(props) {
        super(props);
        // this.cloneThis = this.cloneThis.bind(this);
        this.getCurrentWeek = this.getCurrentWeek.bind(this);
        this.getCurrentMonth = getCurrentMonth.bind(this);
        this.getCurrentYear = getCurrentYear.bind(this);
        this.getCurrentDate = getCurrentDate.bind(this);
        this.getFirstDay = getFirstDay.bind(this);
        this.getLastFullDate = getLastFullDate.bind(this);
        this.getNumberOfWeeks = getNumberOfWeeks.bind(this);
        this.createWeek = createWeek.bind(this);
        this.populateDays = populateDays.bind(this);
        this.populateWeek = this.populateWeek.bind(this);
    }

    componentDidMount() {
        this.populateWeek();
    }

    getCurrentWeek() {
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

    populateWeek() {
        let week = this.getCurrentWeek();
        let a = React.createElement('tr', {colSpan: '7'}, 
            React.createElement('td', {}, 'Times'),
            week.map((day, index) => {
            return React.createElement('td', {className: `${this.props.currentMonth}-${day}`}, day)
        }));
        return a;
    }

    populateTimes() {
        let format = ['AM', 'PM'];
        let times = [12,1,2,3,4,5,6,7,8,9,10,11];
        let week = this.getCurrentWeek();
        let timeList = (format.map((meridiem) => { return times.map((hour) => { return `${hour} ${meridiem}`})})).flat();
        let timeSlots = timeList.map((t) => {
            let slot = React.createElement('td', {}, t);
            return React.createElement('tr', {}, [slot, week.map((l) => React.createElement('td', {}, ''))]);
        })
        console.log('week is',week);
        return timeSlots;

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