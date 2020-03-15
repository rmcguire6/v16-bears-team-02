import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.history.push('/planner');
    }

    render() {
        return (
            <div className="App"> 
                <button onClick={this.handleSubmit}>Plan!</button>
            </div>
        )
    }
}

export default withRouter(Home);