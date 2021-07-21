export function convertStampDate(unixtimestamp: number) {
  // Months array
  let months_arr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert timestamp to milliseconds
  let date = new Date(unixtimestamp * 1000);

  // Year
  let year = date.getFullYear();

  // Month
  let month = months_arr[date.getMonth()];

  // Day
  let day = date.getDate();

  // Hours
  let hours = date.getHours();

  // Minutes
  let minutes = "0" + date.getMinutes();

  // Seconds
  let seconds = "0" + date.getSeconds();

  // Display date time in MM-dd-yyyy h:m:s format
  let fulldate =
    month +
    " " +
    day +
    "-" +
    year +
    " " +
    hours +
    ":" +
    minutes.substr(-2) +
    ":" +
    seconds.substr(-2);

  // final date
  let convdataTime = day + " " + month + "" + year;
  return convdataTime;
}
