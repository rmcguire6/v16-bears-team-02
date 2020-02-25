import React from 'react';
import Calendar from './Calendar';
import Week from './Week';

// const weekRef;

// const Input = React.forwardRef((props, ref) => (
//     <input type="text" ref={ref} />
//   ));

// need connect function to be able to connect to store from Provider
const {connect} = require('react-redux');

class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.childRef = React.createRef();
        // this.weekRef = this.childRef.current;
        // this.WeekWithRef;
        // this.weekRef = this.childRef.current;
        
    }

    componentDidMount() {
        // this.weekRef = React.forwardRef((props,ref) => ( this.childRef.current.week1ref ));
        this.weekRef = this.childRef.current;
        console.log("this is parentelem", this.weekRef);
    }

    render() {
        return (
            <div>
                <Calendar ref={this.childRef}/>
                <Week ref={this.weekRef}/>
            </div>

        );
    }
}

const Container = connect()(Planner);

export default Container;