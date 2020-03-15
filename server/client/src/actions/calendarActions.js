import { 
    STORE_CURRENT_MONTH,
    STORE_CURRENT_YEAR,
    STORE_CURRENT_DATE,
    STORE_CURRENT_WEEK
} from './types';

export const storeCurrentMonth = month => ({
    type: STORE_CURRENT_MONTH,
    payload: month
});

export const storeCurrentYear = year => ({
    type: STORE_CURRENT_YEAR,
    payload: year
});

export const storeCurrentDate = date => ({
    type: STORE_CURRENT_DATE,
    payload: date
});

export const storeCurrentWeek = week => ({
    type: STORE_CURRENT_WEEK,
    payload: week
});