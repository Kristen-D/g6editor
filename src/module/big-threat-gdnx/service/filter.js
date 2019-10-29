import { formatDate } from './date'

export const time = (value, format) => {
    if (value == null || value == undefined || value == "") {
        return "";
    }
    if (format) {
        return formatDate(new Date(value), format);
    } else {
        return formatDate(new Date(value), "yyyy-MM-dd hh:mm:ss");
    }
}
