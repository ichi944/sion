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
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Badge,
  useDisclosure
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { Epic } from '~/server/types'

const Home = () => {
  const [input_title, setInputTitle] = useState<string>('')
  const queryClient = useQueryClient()
  const { data: epics, error } = useAspidaQuery(apiClient.epics)
  const [activeCard, setActiveCard] = useState<Epic | null>(null)
  const [edit_card, setEditCard] = useState<
    Pick<Epic, 'title' | 'description'>
  >({
    title: '',
    description: ''
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
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
      setInputTitle('')
      invalidateEpics()
    },
    [input_title]
  )
  const closeCard = async (id: number) => {
    await apiClient.epics.patch({ body: { type: 'close', id } })
    invalidateEpics()
  }
  const openEditModal = (epic: Epic) => {
    setActiveCard(epic)
    setEditCard({ ...epic })
    onOpen()
  }
  const updateCard = async () => {
    if (!activeCard) {
      return
    }
    const result = await apiClient.epics.patch({
      body: { type: 'update', id: activeCard.id, ...edit_card }
    })
    onClose()
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
      <Box border="1px" borderColor="gray.200" borderRadius="sm" p="8px">
        <ul>
          {epics?.map((epic) => {
            return (
              <li key={epic.id}>
                <span>{epic.title}</span>
                <Badge colorScheme="green">{epic.storyPoint?.point}</Badge>
                <Button onClick={() => openEditModal(epic)}>Edit</Button>
                <Button onClick={() => closeCard(epic.id)}>Close</Button>
              </li>
            )
          })}
        </ul>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Title:{' '}
              <Input
                value={edit_card.title}
                onChange={(e) =>
                  setEditCard((state) => ({ ...state, title: e.target.value }))
                }
              />
            </Box>
            <Box>
              Desctiption:{' '}
              <Input
                value={edit_card.description}
                onChange={(e) =>
                  setEditCard((state) => ({
                    ...state,
                    description: e.target.value
                  }))
                }
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" mr={3} onClick={updateCard}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Home
