import React, { useCallback } from 'react'
import { useQueryClient } from 'react-query'
import { useAspidaQuery } from '@aspida/react-query'
import { apiClient } from '~/utils/apiClient'
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

type AddCardInput = {
  title: string
}

const NewCard = () => {
  const queryClient = useQueryClient()
  const { data: epics, error } = useAspidaQuery(apiClient.epics)
  const {
    register,
    setValue,
    handleSubmit,
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
  return (
    <>
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
    </>
  )
}

export default NewCard
