import { Flex, Text, Button } from '@chakra-ui/react'
import type { FC } from 'react'
import { SetStateAction, Dispatch } from 'react'
import { eventsData } from "../data/eventsData"
import { months } from "../helpers/getCalenderData"


type Props = {
    selectedDate: { day: number; month: string; year: number; },
    setSelectedDateEvents: Dispatch<SetStateAction<{ day: number; month: number; year: number; event_text: string; id: string; }[]>>,
    event: { day: number; month: number; year: number; event_text: string; id: string };
}

const Event: FC<Props> = ({ event, selectedDate, setSelectedDateEvents }) => {
    let thisEvent = event;
    const selectedMonth = months.indexOf(selectedDate.month);
    const selectedDay = selectedDate.day;
    const selectedYear = selectedDate.year

    // delete selected event
    const deleteEvent = () => {
        const eventIndex = eventsData.findIndex(object => {
            return object.id === thisEvent.id;
        });

        eventsData.splice(eventIndex, 1);

        // Update events data
        const filteredEvents = eventsData.filter(event => event.day === selectedDay && event.month === selectedMonth && event.year === selectedYear);
        setSelectedDateEvents(filteredEvents);
    };

    return (
        <Flex
            w='100%'
            bg='white'
            minH='60px'
            borderRadius='13px'
            boxShadow='0 0 99px 0px rgba(0, 0, 0, 0.04)'
            mb='2'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
        >
            <Text p='3' pl="6" maxW="90%">{thisEvent.event_text}</Text>
            <Button
                variant='unstyled'
                right='0'
                top='5px'
                backgroundColor='rgba(0, 0, 0, 0.15)'
                h='15px'
                minH='unset'
                minW='15px'
                borderRadius='10cm'
                mr='6'
                mb="10px"
                fontSize="0.8rem"
                position="relative"
                onClick={deleteEvent}
            >
                <Text color="white" position="absolute" bottom="-0.6" right="1">x</Text>
            </Button>
        </Flex>
    )
}

export default Event
