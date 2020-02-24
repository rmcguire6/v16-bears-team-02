import React from 'react';
import { withRouter } from 'react-router-dom';

class Week extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="Week"> 
               Week!
            </div>
        )
    }
}

export default withRouter(Week);