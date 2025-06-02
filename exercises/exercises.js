import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import isSatSun from "./isWeekend.js";
/*
function getDate() {
  const date = dayjs();
  //const dateAdd = date.add(5, "days");
  //const dateAdd = date.add(1, "month");
  //const dateAdd = date.subtract(1, "month");
  //const dateAdd = date.subtract(1, "month");
  //console.log(dateAdd.format("MMMM, D"));
  //console.log(dateAdd.format("MMMM, D"));
}
*/

let date = dayjs();
date = date.add(6, "days");
console.log(`${date.format("dddd")} | ${isSatSun(date)} `);
