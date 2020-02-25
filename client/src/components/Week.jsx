import React from 'react';
import { withRouter } from 'react-router-dom';

class Week extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log('week ref', this.props);
    }

    render() {
        return (
            <div className="Week"> 
               Week!
            </div>
        )
    }
}

// export default withRouter(Week);
export default React.forwardRef((props,ref) => <Week {...props} ref={ref} />);