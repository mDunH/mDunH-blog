function complement(number) {
    if (number > 9)
        return number.toString();
    else
        return "0" + number;
}
function NewDate(time) {
    return new Date(parseInt(time, 10));
}
const tDate = (time) => {
    const date = NewDate(time);
    return `${complement(date.getFullYear())}-${complement(date.getMonth() + 1)}-${complement(date.getDate())}`;
}
const tSecond = (time) => {
    const date = NewDate(time);
    return `${tDate(time)}  ${complement(date.getHours())}:${complement(date.getMinutes())}:${complement(date.getSeconds())}`;
}
const dateToTime = (date) => {
    return (new Date(date.replace(/-/g, "/"))).getTime();
}

const dateFormat = {
    date: tDate,
    second: tSecond,
    dateToTime
}
export default dateFormat; 