import { v4 as uuidv4 } from 'uuid';

export const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const weekdays = {
  "Mon": 1,
  "Tue": 2,
  "Wed": 3,
  "Thu": 4,
  "Fri": 5,
  "Sat": 6,
  "Sun": 7
}

export const currentDate = new Date();
export const currentDay = currentDate.getDate();
export const currentMonthNumber = currentDate.getMonth();
export const currentMonthName = months[currentMonthNumber];
export const currentYear = new Date().getFullYear()

export function getCalenderData(activeYear: number, activeMonthNumber: number) {

  // get number of days in month
  const getDays = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  // get weekday type of first day of month
  function getFirstDayOfMonth(year: any, month: any) {
    return new Date(year, month, 1);
  }

  type monthData = {
    monthName: string,
    numberOfDays: number,
    firstDayofMonth: string
  }

  const previusMonthData: monthData = {
    monthName: months[(activeMonthNumber) - 1],
    numberOfDays: getDays(activeYear, (activeMonthNumber)),
    firstDayofMonth: String(getFirstDayOfMonth(activeYear, (activeMonthNumber) - 1)).substring(0, 3)
  }

  const activeMonthData: monthData = {
    monthName: months[activeMonthNumber],
    numberOfDays: getDays(activeYear, activeMonthNumber + 1),
    firstDayofMonth: String(getFirstDayOfMonth(activeYear, activeMonthNumber)).substring(0, 3)
  }

  type dateInfoType = {
    "day": number,
    "monthNumber": number | undefined,
    "isDisabled": boolean,
    "id": string
  }

  // create array of days in previus month
  let previusMonthDisplayed = [];

  for (let i = 1; i < previusMonthData.numberOfDays + 1; i++) {
    const dateInfo: dateInfoType = {
      "day": i,
      "monthNumber": undefined,
      "isDisabled": true,
      "id": uuidv4()
    }

    previusMonthDisplayed.push(dateInfo);
  }

  // create array of days in active month
  let activeMonthDisplayed = [];

  for (let i = 1; i < activeMonthData.numberOfDays + 1; i++) {
    const dateInfo = {
      "day": i,
      "monthNumber": activeMonthNumber,
      "isDisabled": false,
      "id": uuidv4()
    }

    activeMonthDisplayed.push(dateInfo);
  }

  // get weekday active month starts at
  const monthWeekdayStart = weekdays[activeMonthData.firstDayofMonth as keyof typeof weekdays];

  // slice previus month array
  if (monthWeekdayStart !== 1) {
    previusMonthDisplayed = previusMonthDisplayed.slice(-(monthWeekdayStart - 1));
  } else {
    previusMonthDisplayed.length = 0;
  }

  // Get number of days shown in next month
  const nextMonthDispayAmount = 42 - (previusMonthDisplayed.length + activeMonthDisplayed.length);

  // create array of days in next month
  const nextMonthDispay = [];
  for (let i = 1; i < nextMonthDispayAmount + 1; i++) {
    const dateInfo = {
      "day": i,
      "isDisabled": true,
      "id": uuidv4()
    }

    nextMonthDispay.push(dateInfo);
  }

  // Destruct objects into array 
  let calenderData = [...previusMonthDisplayed, ...activeMonthDisplayed, ...nextMonthDispay]

  return calenderData;
}

