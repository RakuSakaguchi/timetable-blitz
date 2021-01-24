import React from "react"
import { Heading, Flex, Box } from "@chakra-ui/react"
import Link from "next/link"

const Header = (props) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.3rem"
      bg="gray.700"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <Link href="/">TimeTable App</Link>
        </Heading>
      </Flex>

      <Flex align="center" mr={5}>
        <Link href="/events/new">
          <a>CreateEvent</a>
        </Link>
      </Flex>
    </Flex>
  )
}

export default Header
