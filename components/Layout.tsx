import React, { Component, ReactNode } from 'react'
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
  Container
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

type Props = {
  children: ReactNode
}
const Layout = (props: Props) => {
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding={4}
        bg="darkblue.100"
        color="white"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Box display={{ base: 'block' }} mr="4">
            <HamburgerIcon />
          </Box>

          <Heading as="h1" size="md" letterSpacing={'tighter'}>
            Tasks
          </Heading>
        </Flex>
      </Flex>
      <Container>{props.children}</Container>
    </>
  )
}

export default Layout
