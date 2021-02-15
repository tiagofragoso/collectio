export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat([], {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
    return formatter.format(date);
}
;
