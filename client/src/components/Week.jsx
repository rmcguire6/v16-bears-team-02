import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class Week extends React.Component {
    constructor(props) {
        super(props);
        this.cloneThis = this.cloneThis.bind(this);
        this.getCurrentWeek = this.getCurrentWeek.bind(this);
    }

    componentDidMount() {
        //    this.cloneThis();
            console.log('week props', this.props.currentWeek);
            let id = this.props.currentWeek;
            this.cloneThis();
            // if(this.props.currentWeek === null) {
            //     this.getCurrentWeek();
            // }
            
    }

    getCurrentWeek() {
        // console.log('getCurrentWeek');
        // let week;
        //     console.log(Array.from(document.querySelectorAll('#calendar td')).find(el => el.textContent === this.getCurrentDate()));
        //     // week = (Array.from(document.querySelectorAll('#calendar td')).find(el => el.textContent === this.getCurrentDate())).parentNode.id;
        //     week = 'week-2';
        //     this.props.storeCurrentWeekToState('week-2');
        // }
        // return week;
    }

    cloneThis() {

            let c = document.getElementById('copy');
            c.appendChild((document.getElementById('weekdays')).cloneNode(true));
            c.appendChild((document.getElementById('week-2')).cloneNode(true));
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
    // return {
    //     storeCurrentWeekToState: (week) => {
    //         console.log('storeCurrentWeekToState');
    //         dispatch(storeCurrentWeek(week));
    //     }
    // }
};


// export default withRouter(Week);
// export default React.forwardRef((props,ref) => <Week {...props} ref={ref} />);

const Container = connect(mapStateToProps)(Week);
export default Container;