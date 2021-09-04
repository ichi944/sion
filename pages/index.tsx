import Head from 'next/head'
import React, { useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useAspidaQuery } from '@aspida/react-query'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import UserBanner from '~/components/UserBanner'
import type { Task } from '$prisma/client'
import type { FormEvent, ChangeEvent } from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button
} from '@chakra-ui/react'

const Home = () => {
  const [input_title, setInputTitle] = useState<string>('')
  const queryClient = useQueryClient()
  const { data: epics, error } = useAspidaQuery(apiClient.epics)
  const handleUpdateInputTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputTitle(e.target.value)
    },
    []
  )
  const invalidateEpics = useCallback(
    () => queryClient.invalidateQueries(apiClient.epics.$path()),
    [queryClient]
  )
  const addCard = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      await apiClient.epics.post({ body: { title: input_title } })
      invalidateEpics()
    },
    [input_title]
  )
  const deleteCard = async (id: number) => {
    await apiClient.epics.delete({ body: { id } })
    invalidateEpics()
  }
  return (
    <>
      <Box h="8"></Box>
      <Box border="1px" borderColor="gray.200" borderRadius="sm" p="8px">
        <Heading as="h2" size="md">
          Card Registration
        </Heading>
        <FormControl id="title">
          <FormLabel>Please input title</FormLabel>
          <Input
            type="text"
            value={input_title}
            onChange={handleUpdateInputTitle}
          ></Input>
        </FormControl>
        <Box h="8"></Box>
        <FormControl>
          <Button onClick={addCard}>Add</Button>
        </FormControl>
      </Box>
      <Box
        border="1px"
        backgroundColor="gray.100"
        borderColor="gray.200"
        borderRadius="sm"
        p="8px"
      >
        {epics?.map((epic) => {
          return (
            <Box
              key={epic.id}
              p={2}
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              backgroundColor="white"
              mb={1}
            >
              {epic.title}
              <Badge colorScheme="blue" m={1}>
                {epic.storyPoint?.point}
              </Badge>
              <Button size="xs" onClick={() => deleteCard(epic.id)}>
                Delete
              </Button>
            </Box>
          )
        })}
      </Box>
    </>
  )
}

export default Home
