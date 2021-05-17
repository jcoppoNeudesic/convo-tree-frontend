/**
 * Takes time stamp number and returns formatted date. Example: "5/14/2006 8:29 PM". Year not displayed if it is the current year.
 */
const formatDate = (date: number): string => {
    const dateObj = new Date(date);
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();
    const time = dateObj.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const newDate = new Date();
    const shouldShowYear = newDate.getUTCFullYear() !== year ? true : false;

    if (shouldShowYear) {
        return month + "/" + day + '/' + year + ' ' + time;
    }
    return month + "/" + day + ' ' + time;
}

const dateMethods = { formatDate };
export default dateMethods;