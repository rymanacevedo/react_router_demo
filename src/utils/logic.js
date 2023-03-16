export const findDateData = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * -1;
    const offsetHours = Math.floor(offset / 60);
    const offsetMinutes = offset % 60;
    const offsetString = ` ${offset >= 0 ? '+' : '-'}${Math.abs(offsetHours)
        .toString()
        .padStart(2, '0')}${offsetMinutes.toString().padStart(2, '0')}`;
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}${offsetString}`;
    return dateString;
};