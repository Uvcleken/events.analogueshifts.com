export function convertDateFormat(dateStr: string) {
  let dateObj = new Date(dateStr);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = monthNames[dateObj.getMonth()];
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();

  return `${month} ${day}, ${year}`;
}
