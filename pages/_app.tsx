import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { extendTheme } from '@chakra-ui/react'
import Layout from '~/components/Layout'

const theme = extendTheme({
  colors: {
    darkblue: {
      50: '#011627',
      100: '#0a3148'
    }
  }
})

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp
