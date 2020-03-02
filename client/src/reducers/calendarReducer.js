import { 
  STORE_CURRENT_MONTH, 
  STORE_CURRENT_YEAR, 
  STORE_CURRENT_DATE, 
  STORE_CURRENT_WEEK 
} from '../actions/types';

const initialState = {
    currentMonth: null,
    currentYear: null,
    currentDate: null,
    currentWeek: null
};

// Actions are dispatched to this reducer...
const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
      case STORE_CURRENT_MONTH:
        return {
          ...state,
          currentMonth: action.payload
        };
      case STORE_CURRENT_YEAR:
        return {
          ...state,
          currentYear: action.payload
        };
      case STORE_CURRENT_DATE: 
        return {
          ...state,
          currentDate: action.payload
        };
      case STORE_CURRENT_WEEK: 
        return {
          ...state,
          currentWeek: action.payload
      };
      default:
        return state;
    }
};

export default calendarReducer;