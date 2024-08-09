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
