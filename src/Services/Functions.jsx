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