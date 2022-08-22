import moment from 'moment';

export const dateHelper = {

    getMomentInstance: (date, lang) => moment(date || new Date()).locale(lang),
    getTodayDate: (lang) => moment().locale(lang).format('MM DD YYYY, h:mm:ss'),
    getMonthFirstDate: (lang) => moment().startOf('month').locale(lang).format('MM DD YYYY, h:mm:ss'),

    getTodayWidthDate: (date, lang) => moment(date || new Date()).locale(lang).format('MM DD YYYY, h:mm:ss'),
    getMonthWidthFirstDate: (date, lang) => moment(date || new Date()).startOf('month').locale(lang).format('MM DD YYYY, h:mm:ss'),


    getToday: (date) => moment(date || new Date()).startOf('day').toDate(),
    getTodayRange: (date) => ({
        startDate: moment(date || new Date()).startOf('day').toDate(),
        endDate: moment(date || new Date()).endOf('day').toDate()
    }),
    getMonthRange: (date) => ({
        startDate: moment(date || new Date()).startOf('month').toDate(),
        endDate: moment(date || new Date()).endOf('month').toDate()
    }),
    getCurrentDay: () => {
        let currentDate = moment(new Date());
        let weekDays = dateHelper.getCurrentWeekWorkDay()
        let selectedCurrentDate = 0;
        for (let i = 0; i <= 4; i++) {
            let isCurrentDay = currentDate.isSame(weekDays[i], "day");
            if (isCurrentDay) {
                selectedCurrentDate = i
            }
        };
        return [selectedCurrentDate];
    },
    getCurrentWeekWorkDay: () => {
        let currentDate = moment();
        let weekStart = currentDate.clone().startOf('week');
        var days: any = [];
        for (let i = 1; i <= 5; i++) {
            days.push(moment(weekStart).add(i, 'days').toDate());
        };
        return days;
    },
}