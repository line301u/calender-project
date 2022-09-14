import { Box, Grid, Heading, Flex, GridItem, Button, Text } from '@chakra-ui/react'
import type { FC } from 'react'
import CalendarDay from "./CalendarDay"
import { weekdays } from "../helpers/getCalenderData"
import LeftArrow from "../assets/LeftArrow"
import RightArrow from "../assets/RightArrow"

type Props = {
  calenderData: { day: number; isDisabled: boolean; id: string; }[],
  activeMonthName: string,
  activeYear: number,
  handleClickBack: () => void,
  handleClickForward: () => void,
  getSelectedDate?: (selectedDate: { day: number; month: string; year: number; }, thisDate: any) => any,
  selectedDate: { day: number; month: string; year: number; },
  setCurrentDate: () => void;
}

const Calendar: FC<Props> = ({
  calenderData,
  activeMonthName,
  activeYear,
  handleClickBack,
  handleClickForward,
  getSelectedDate,
  selectedDate,
  setCurrentDate }) => {

  return (
    <Box
      w={{ base: "90vw", sm: "500px" }}
      bg='white'
      h='400px'
      borderRadius='13px'
      boxShadow='0 0 99px 0px rgba(0, 0, 0, 0.04)'
      mb='10'
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      overflow="hidden"
    >
      <Flex
        w='100%'
        justifyContent='space-between'
        align-items="center"
        p="6"
        pb="5"
      >
        <Flex alignItems="center">
          <Heading as="h4" fontSize="1.3rem">{activeMonthName}</Heading>
          <Heading as="h4" fontSize="1.3rem" fontWeight="300" pl="1.5">{activeYear}</Heading>
        </Flex>

        <Flex align-items="center">
          <Button
            variant='unstyled'
            right='0'
            top='5px'
            backgroundColor='#4a5ae6'
            h='25px'
            minH='unset'
            minW='25px'
            borderRadius='10cm'
            color="white"
            fontSize="0.7rem"
            onClick={handleClickBack}
            position="static"
            display="flex"
            alignSelf="center"
          >
            <Box mr="2px">
              <LeftArrow />
            </Box>
          </Button>

          <Text
            cursor="pointer"
            onClick={setCurrentDate}
            color="#4a5ae6"
            fontSize="1.2rem"
            fontWeight="500"
            ml="3"
            mr="3"
          >
            Today
          </Text>

          <Button
            variant='unstyled'
            right='0'
            top='5px'
            backgroundColor='#4a5ae6'
            h='25px'
            minH='unset'
            minW='25px'
            borderRadius='10cm'
            onClick={handleClickForward}
            position="static"
            display="flex"
            alignSelf="center"
          >
            <Box ml="2px">
              <RightArrow />
            </Box>
          </Button>

        </Flex>
      </Flex>

      <Grid
        templateColumns='repeat(7, 1fr)'
        w="100%"
        justifyItems="center"
        borderBottom="1px solid rgba(0, 0, 0, 0.05)"
        pb="1"
      >
        {Object.keys(weekdays).map((weekday, i) => (
          <GridItem key={weekday}
            fontSize="0.9rem"
            opacity="0.2"
          >
            {weekday.slice(0, 2)}</GridItem>
        ))}
      </Grid>

      <Grid
        templateColumns='repeat(7, 1fr)'
        w="100%"
        h="100%"
        justifyItems="end"
      >
        {calenderData.map((calenderDay) => (
          <CalendarDay
            key={calenderDay.id}
            day={calenderDay.day}
            year={activeYear}
            month={activeMonthName}
            isDisabled={calenderDay.isDisabled}
            getSelectedDate={getSelectedDate}
            selectedDate={selectedDate}
          />
        ))}

      </Grid>
    </Box >
  )
}

export default Calendar
