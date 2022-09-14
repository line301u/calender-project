import { Box, Center } from "@chakra-ui/react"
import Calendar from "./components/Calendar"
import Events from "./components/Events"
import { useState } from 'react';
import { getCalenderData } from "./helpers/getCalenderData"
import { months } from "./helpers/getCalenderData"
import { currentMonthNumber, currentMonthName, currentYear, currentDay } from "./helpers/getCalenderData"
import { eventsData } from "./data/eventsData"

let activeYear = currentYear;
let activeMonthNumber = currentMonthNumber;
let activeMonthName = months[currentMonthNumber];

const App: React.FC = () => {

  // set calender data to current date
  let [calenderData, setCalenderData] = useState(getCalenderData(activeYear, activeMonthNumber))

  const currentDateInfo = {
    "day": currentDay,
    "month": currentMonthName,
    "year": currentYear
  }

  // set selcted date to current date
  const [selectedDate, setSelectedDate] = useState(currentDateInfo)

  // set events to events from current date
  const currentDateEvents = eventsData.filter(event => event.day === currentDay && event.month === currentMonthNumber && event.year === currentYear);
  const [selectedDateEvents, setSelectedDateEvents] = useState(currentDateEvents)

  // get date selected by user
  const getSelectedDate = (selectedDate: { day: number; month: string; year: number; }, thisDate: any) => {
    setSelectedDate(selectedDate)

    const selectedMonth = months.indexOf(selectedDate.month);
    const selectedDay = selectedDate.day;
    const selectedYear = selectedDate.year

    // update events from selected date
    const selectedDateEvents = eventsData.filter(event => event.day === selectedDay && event.month === selectedMonth && event.year === selectedYear);
    setSelectedDateEvents(selectedDateEvents);
  }

  // update calender data to previus month on click back
  const handleClickBack = () => {
    activeMonthNumber = activeMonthNumber - 1;
    activeMonthName = months[activeMonthNumber];

    if (activeMonthNumber === -1) {
      activeYear = activeYear - 1;
      activeMonthNumber = 11;
      activeMonthName = months[activeMonthNumber];
    }

    setCalenderData(getCalenderData(activeYear, activeMonthNumber))
  }

  // update calender data to next month on click back
  const handleClickForward = () => {
    activeMonthNumber = activeMonthNumber + 1;
    activeMonthName = months[activeMonthNumber];

    if (activeMonthNumber === 12) {
      activeYear = activeYear + 1;
      activeMonthNumber = 0;
      activeMonthName = months[activeMonthNumber];
    }

    setCalenderData(getCalenderData(activeYear, activeMonthNumber))
  }

  // set calender data and events to current date on click "today"
  const setCurrentDate = () => {
    setCalenderData(getCalenderData(currentYear, currentMonthNumber))
    activeYear = currentDateInfo.year;
    activeMonthName = currentDateInfo.month;
    getSelectedDate({ "day": currentDateInfo.day, "month": currentDateInfo.month, "year": currentDateInfo.year }, undefined)
  }

  return (
    <Box
      bg='#F4F4F4'
      w='100%'
      minH='100vh'
      p='10'
    >
      <Center>
        <Box>
          <Calendar
            calenderData={calenderData}
            activeMonthName={activeMonthName}
            activeYear={activeYear}
            selectedDate={selectedDate}
            handleClickBack={handleClickBack}
            handleClickForward={handleClickForward}
            getSelectedDate={getSelectedDate}
            setCurrentDate={setCurrentDate}
          />
          <Events
            selectedDate={selectedDate}
            selectedDateEvents={selectedDateEvents}
            setSelectedDateEvents={setSelectedDateEvents} />
        </Box>
      </Center>
    </Box>
  );
}

export default App;
