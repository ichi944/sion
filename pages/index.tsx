import Head from 'next/head'
import React, { useCallback, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useAspidaQuery } from '@aspida/react-query'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import UserBanner from '~/components/UserBanner'
import type { Task } from '$prisma/client'
import type { FormEvent, ChangeEvent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
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
import { Epic, EpicWithStoryPoint, StoryPoint } from '~/server/types'

type AddCardInput = {
  title: string
}

const Home = () => {
  const [input_title, setInputTitle] = useState<string>('')
  const queryClient = useQueryClient()
  const { data: epics, error } = useAspidaQuery(apiClient.epics)
  const [activeCard, setActiveCard] = useState<Epic | null>(null)
  const [edit_card, setEditCard] = useState<
    Pick<Epic, 'title' | 'description'> & { storyPoint: StoryPoint | null }
  >({
    title: '',
    description: '',
    storyPoint: null
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<AddCardInput>()
  const onSubmit: SubmitHandler<AddCardInput> = async (data) => {
    await apiClient.epics.post({ body: { title: data.title } })
    invalidateEpics()
    setValue('title', '')
  }
  const invalidateEpics = useCallback(
    () => queryClient.invalidateQueries(apiClient.epics.$path()),
    [queryClient]
  )
  const closeCard = async (id: number) => {
    await apiClient.epics.patch({ body: { type: 'close', id } })
    invalidateEpics()
  }
  const openEditModal = (epic: EpicWithStoryPoint) => {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="title">
            <FormLabel htmlFor="title">Please input title</FormLabel>
            <Input
              {...register('title', {
                required: true,
                minLength: 1,
                maxLength: 120
              })}
              placeholder="Enter card title"
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <Box h="8"></Box>
          <Button type="submit">Submit</Button>
        </form>
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
            <Box>
              Story Point:{' '}
              <Input
                value={edit_card.storyPoint?.point || ''}
                onChange={(e) =>
                  setEditCard((state) => ({
                    ...state,
                    storyPoint: state.storyPoint && {
                      ...state.storyPoint,
                      point: parseInt(e.target.value, 10)
                    }
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
