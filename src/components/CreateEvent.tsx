import { Box, Button, Input } from '@chakra-ui/react'
import type { FC } from 'react'
import { useRef } from 'react'

type Props = {
    addEvent: (eventInput: any) => void
}

const CreateEvent: FC<Props> = ({ addEvent }) => {
    const eventInput = useRef<HTMLInputElement>(null);

    return (
        <Box position='relative' width='100%'>
            <Input placeholder='Add new event'
                w='100%'
                bg='white'
                minH='60px'
                borderRadius='13px'
                boxShadow='0 0 99px 0px rgba(0, 0, 0, 0.04)'
                mb='2'
                p='3'
                pl="6"
                pr="4rem"
                variant='unstyled'
                fontSize='1rem'
                outlineOffset='0'
                transition='.3s'
                _focus={{ outline: '1px solid rgba(0, 0, 0, 0.08)' }}
                ref={eventInput}
            />
            <Button
                position='absolute'
                variant='unstyled'
                right='0'
                top='17px'
                backgroundColor='#4a5ae6'
                h='25px'
                minH='unset'
                minW='25px'
                borderRadius='10cm'
                onClick={() => { addEvent(eventInput); eventInput.current?.blur() }}
                display="flex"
                alignSelf="center"
                mr="6"
            >
                <Box color="white" mb="2px">+</Box>
            </Button>
        </Box>

    )
}

export default CreateEvent
