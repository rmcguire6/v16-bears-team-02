export const getCurrentMonth = function() {
    console.log('getCurrentMonth');
    let month;
    if(this.props.currentMonth !== null) {
        month = this.props.currentMonth;
    } else {
        month = (new Date()).getMonth();
        this.props.storeCurrentMonthToState(month);
    }
    return month;
}


export const getCurrentYear = function() {
    console.log('getCurrentYear');
    let year;
    if(this.props.currentYear !== null) {
        year = this.props.currentYear;
    } else {
        year = (new Date()).getFullYear();
        this.props.storeCurrentYearToState(year);
    }
    return year;
}

export const getCurrentDate = function() {
    console.log('getCurrentDate');
    let date;
    if(this.props.currentDate !== null) {
        date = this.props.currentDate;
    } else {
        date = (new Date()).getDate();
    }
    this.props.storeCurrentDateToState(date);
    return date;
}


// last date of any given month is
// 1st date of next month - 1
// need current year
export const getLastFullDate = function() {
    console.log('getLastFullDate');
    let currentMonth = this.props.currentMonth || this.getCurrentMonth();
    let currentYear = currentMonth === 11 ? // if december, make it new year
        (this.props.currentYear  || this.getCurrentYear()) + 1 
        : (this.props.currentYear  || this.getCurrentYear());
    let nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    // add 1 to nextMonth to get exact month
    // because months array is zero-based
    // thus, 0 is january but 1/1 is january 1st in date format
    let nextMonthFullDate = (new Date(`${nextMonth + 1}/1/${currentYear}`));
    let lastFullDate =  (new Date(nextMonthFullDate.setDate(0)));
    return lastFullDate;
}

// get first day of the month
export const getFirstDay = function() {
    console.log('getFirstDay');
    let month = this.getCurrentMonth() + 1;
    let currentYear = this.getCurrentYear();
    let firstDate = (new Date(`${month}/1/${currentYear}`));
    let firstDay = firstDate.getDay();
    return firstDay;
}


//get # of weeks
// count 2 weeks straight off-the-bat. 1st week where first date of month is.
// 2nd week is where last date of month is.
// take first date of the last week, subtract 1 to get the last date of the week before
// i.e. if 27 is first date of last week, then the 26th is the last date of the week before
// after getting that date, look for the last date of the first week
// then subtract that from the last date of 2nd-to-the-last week
export const getNumberOfWeeks = function() {
    console.log('getNumberOfWeeks');
    let weekCount = 2;
    let lastFullDate = this.getLastFullDate();
    let lastDate = lastFullDate.getDate();
    let lastDay = lastFullDate.getDay();
    let a = lastDate - lastDay;
    let firstDay = this.getFirstDay();
    let b = 1 + (6 - firstDay);
    weekCount += (a - b - 1)/7
    return weekCount;
}