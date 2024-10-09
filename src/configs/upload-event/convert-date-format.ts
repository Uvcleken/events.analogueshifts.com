export function convertDateFormat(inputDateTime: string) {
  let datetime = new Date(inputDateTime);

  let year = datetime.getFullYear();
  let month = ("0" + (datetime.getMonth() + 1)).slice(-2);
  let day = ("0" + datetime.getDate()).slice(-2);

  // Extract time components
  let hours = ("0" + datetime.getHours()).slice(-2);
  let minutes = ("0" + datetime.getMinutes()).slice(-2);
  let seconds = ("0" + datetime.getSeconds()).slice(-2);

  // Construct formatted date-time string
  let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

export function extractTime(dateString: string) {
  let date = new Date(dateString);

  let hours: any = date.getHours();
  let minutes: any = date.getMinutes();

  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${ampm}`;
}

export function extractDate(dateString: any) {
  // Create a Date object from the string
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getDate();
  const monthIndex = date.getMonth(); // 0-based index
  const year = date.getFullYear();

  // Array of month names
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

  // Format the date in "DD MMM YYYY" format
  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
}
