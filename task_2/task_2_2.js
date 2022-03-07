const getDayInfo = (date) => {
    const regExp = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;

    if (!regExp.test(date)) {
        return `${date} - неверный формат даты! Введите: "dd.mm.yyyy".`
    } else {
        const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        const [number, month, year] = date.split('.');
        
        if (+month > 12 || +number > daysInMonths[+month - 1]) {
            return `Даты ${date} не существует!`
        } else if (+number === 29 && +month === 2 && (!(+year % 4 === 0) || +year % 100 === 0 && +year % 400 !== 0)) {
            return `Даты ${date} не существует, так как только каждый четвёртый год, который при этом или не кратен 100, или кратен 400, является високосным!`
        } else {
            const lastYear = +year - 1;

            const daysCountFromLastDayOfNotOurEraTo31DecemberLastYear = (((lastYear - lastYear % 4) / 4) * (4 * 365 + 1)) + ((lastYear % 4) * 365) - ((lastYear - lastYear % 100) / 100) + ((lastYear - lastYear % 400) / 400);
            let daysCountFrom31DecemberLastYearToNow = +number;

            for (let i = 1; i < +month; i++) {
                daysCountFrom31DecemberLastYearToNow = daysCountFrom31DecemberLastYearToNow + (i !== 2 || (i === 2 && +year % 4 === 0 && (+year % 400 === 0 || +year % 100 !== 0)) ? daysInMonths[i - 1] : (daysInMonths[i - 1] - 1))
            }
            
            const allWeekDays =['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            const weekDay = allWeekDays[(daysCountFromLastDayOfNotOurEraTo31DecemberLastYear + daysCountFrom31DecemberLastYearToNow) % 7];
            
            const weekNumberInCurrentMonth = (+number % 7 === 0 ? +number / 7 : (+number - +number % 7) / 7 + 1);
            
            const allMonths = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
            const monthString = allMonths[+month - 1];
            
            return `${weekDay}, ${weekNumberInCurrentMonth} неделя ${monthString} ${+year} года`
        }
    }
};

console.log(getDayInfo('01.01.2022'));
console.log(getDayInfo('15.12.2021'));
console.log(getDayInfo('07.03.2022'));
