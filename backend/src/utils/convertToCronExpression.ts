/* 

    Equivalent time in minutes to use in function convertToCronExpression()

    1       // 1 min
    720     // 12 h 0 min
    1440    // 1 day
    43200   // 1 month
    525600  // 1 year

*/

const convertToCronExpression = (value: any) => {
    if (value < 1) {
        return `*/1 * * * *`;
    } else if (value < 60) {
        return `*/${value} * * * *`;
    } else if (value < 1440) {
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${minutes} ${hours} * * *`;
    } else if (value < 43200) {
        const days = Math.floor(value / 1440);
        return `0 */${days} * * *`;
    } else if (value < 525600) {
        const months = Math.floor(value / 43200);
        return `0 0 1 */${months} *`;
    } else {
        const years = Math.floor(value / 525600);
        return `0 0 1 1 */${years}`;
    }
};

export default convertToCronExpression;