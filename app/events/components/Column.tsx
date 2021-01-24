import React, { Suspense, useEffect, useState } from "react"
import Timer from "app/components/Timer"
import { Flex, Box, Center, Text } from "@chakra-ui/react"

type SpeakerProps = {
  name: string
  start: string
  end: string
}

const Column: React.FC<SpeakerProps> = (props) => {
  const [dates, setDates] = useState(new Date())
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDates(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  })

  let titleStyle = { color: "red" }
  if (new Date(props.end).getTime() < dates.getTime()) {
    titleStyle = { color: "gray" }
  }

  if (props.name.length >= 7) {
    titleStyle = { ...titleStyle }
  }
  return (
    <>
      <hr />
      <Box
        boxShadow="md"
        height="120px"
        color="white"
        bgGradient="linear(to-r, gray.800, gray.700)"
        m={[0, 3]}
      >
        <Center>
          <Flex align="center">
            <Box mr={"20px"}>
              <Text fontSize="25px">{props.start.slice(16, 21)}</Text>
            </Box>

            <Box>
              <div style={titleStyle} className="name">
                <Text fontSize="50px">{props.name}</Text>
              </div>
            </Box>
          </Flex>
        </Center>
        <Box align="center" mt={"-10px"}>
          <Timer start={props.start} end={props.end} />
        </Box>
      </Box>
    </>
  )
}
export { Column }
