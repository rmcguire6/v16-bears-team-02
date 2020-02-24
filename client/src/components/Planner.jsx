import React from 'react';
import Calendar from './Calendar';
import Week from './Week';
// need connect function to be able to connect to store from Provider
const {connect} = require('react-redux');

class Planner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Calendar />
                <Week />
            </div>

        );
    }
}

const Container = connect()(Planner);

export default Container;