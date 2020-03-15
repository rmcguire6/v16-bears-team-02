// Root Reducer
import { combineReducers } from 'redux';

// reducers
import plannerReducer from './plannerReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
    calendar: calendarReducer,
    planner: plannerReducer // access state in container components using `this.props.auth`
});

export default rootReducer;