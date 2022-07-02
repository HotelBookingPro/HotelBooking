class IndexConverter {
    convertDayToIndex = (date) => {
        let date1, date2;
        date1 = new Date("01/01/2022")
        date2 = new Date(date)
        const calTime = date2.getTime() - date1.getTime()
        console.log(calTime);
        const calDays = calTime/(1000 * 60 * 60 * 24)
        console.log(calDays);
        return calDays;
    }
}
module.exports = IndexConverter