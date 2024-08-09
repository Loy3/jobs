import moment from 'moment';

export const FormattedDate = () => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const dayOfWeek = daysOfWeek[today.getDay()];
    const dayOfMonth = today.getDate();
    const monthOfYear = monthsOfYear[today.getMonth()];
    const year = today.getFullYear();
    let day = "";
    if (dayOfMonth < 10) {
        day = "0" + dayOfMonth;
    } else {
        day = dayOfMonth.toString();
    }
    const formattedDate = `${dayOfWeek}, ${day} ${monthOfYear} ${year}`;

    return formattedDate;
}

export const ReturnFormattedDate = (date) => {
    const formattedDate = moment(date).format('dddd, DD MMMM YYYY');
    return formattedDate;
}


export const HandleColor = (type) => {
    var color = "rgba(0, 0, 0, 0.5)";
    switch (type) {
        case "Hybrid":
            color = "#FFFF32";
            break;
        case "Onsite":
            color = "#4CA64C";
            break;
        case "Remote":
            color = "#A0D9EF";
            break;
        default:
            break;
    }
    return color;
}