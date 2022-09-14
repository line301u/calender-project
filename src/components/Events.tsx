import { Heading, Flex, Box } from '@chakra-ui/react'
import type { FC } from 'react'
import { SetStateAction, Dispatch } from 'react'
import Event from "./Event"
import CreateEvent from "./CreateEvent"
import { months } from "../helpers/getCalenderData"
import { eventsData } from "../data/eventsData"
import { v4 as uuidv4 } from 'uuid';

type Props = {
  selectedDate: { day: number; month: string; year: number; },
  selectedDateEvents: { day: number; month: number; year: number; event_text: string; id: string }[],
  setSelectedDateEvents: Dispatch<SetStateAction<{ day: number; month: number; year: number; event_text: string; id: string; }[]>>
}

const Events: FC<Props> = ({ selectedDateEvents, selectedDate, setSelectedDateEvents }) => {
  // capitalize month name
  selectedDate.month = selectedDate.month.charAt(0).toUpperCase() + selectedDate.month.slice(1)

  // get input value and add event
  const addEvent = (eventInput: any) => {
    const eventInputValue = eventInput.current.value;
    const selectedMonth = months.indexOf(selectedDate.month);
    const selectedDay = selectedDate.day;
    const selectedYear = selectedDate.year

    const event = {
      "day": selectedDate.day,
      "month": months.indexOf(selectedDate.month),
      "year": selectedDate.year,
      "event_text": eventInputValue,
      "id": uuidv4()
    }

    // add event to event data
    if (eventInputValue.length > 0) {
      eventsData.unshift(event);

      // Update events
      setSelectedDateEvents(eventsData.filter(event => event.day === selectedDay && event.month === selectedMonth && event.year === selectedYear));
      eventInput.current.value = "";
    }

  };

  return (
    <Flex
      w={{ base: "90vw", sm: "500px" }}
      justifyContent='center'
      alignItems='start'
      flexDirection='column'
    >
      <Heading as='h4' p="5" fontSize="2rem" fontWeight="300">{`${selectedDate.month} ${selectedDate.day}`}</Heading>
      <CreateEvent addEvent={addEvent} />
      <Box w="100%">
        {selectedDateEvents.map((event) => (
          <Event event={event} key={event["id"]} setSelectedDateEvents={setSelectedDateEvents} selectedDate={selectedDate} />
        ))}
      </Box>
    </Flex>
  )
}

export default Events
