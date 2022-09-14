import { GridItem, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import { useRef } from 'react';

type Props = {
  day: number,
  month: string,
  year: number,
  isDisabled: boolean,
  getSelectedDate?: (selectedDate: { day: number; month: string; year: number; }, thisDate: any) => any;
  selectedDate: { day: number; month: string; year: number; },
}

const CalendarDay: FC<Props> = ({ day, month, year, isDisabled, getSelectedDate, selectedDate }) => {
  const thisDate = useRef<HTMLInputElement>(null);

  const dayIsActive = ((selectedDate.day === day && selectedDate.month === month) ? true : false);

  type dateInfoType = {
    day: number,
    month: string,
    year: number
  }

  const dateInfo: dateInfoType = {
    "day": day,
    "month": month,
    "year": year
  }

  if (isDisabled) {
    return (
      <GridItem
        w='100%'
        h='100%'
        alignSelf="end"
        display="flex"
        alignItems="end"
        justifyContent="end"
        borderBottom="1px solid rgba(0, 0, 0, 0.05)"
        borderRight="1px solid rgba(0, 0, 0, 0.05)"
      >
        <Text p="1" pr="2.5" fontSize="1.2rem" fontWeight="300" color="rgba(0, 0, 0, 0.13)">{day}.</Text>
      </GridItem>
    )
  } else {
    return (
      <GridItem
        w='100%'
        h='100%'
        alignSelf="end"
        display="flex"
        alignItems="end"
        justifyContent="end"
        borderBottom="1px solid rgba(0, 0, 0, 0.05)"
        borderRight="1px solid rgba(0, 0, 0, 0.05)"
        _hover={dayIsActive ? {} : { backgroundColor: 'rgba(0, 0, 0, 0.04)' }}
        transition=".3s"
        cursor="pointer"
        className={dayIsActive ? 'calender-day active-date' : "calender-day"}
        onClick={() => { getSelectedDate?.(dateInfo, thisDate); }}
        ref={thisDate}
      >
        <Text p="1" pr="2.5" fontSize="1.2rem" fontWeight="300">{day}.</Text>
      </GridItem >
    )
  }
}

export default CalendarDay
