import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import { Blog, MyContext } from '../context/mycontext'

export default function App({ Component, pageProps }: AppProps) {

  const [data, setData] = useState<string>('');

  const [allBlogs, setAllBlogs] = useState<Blog[]>([])

  return (<>
    <MyContext.Provider value={{ data, setData, allBlogs, setAllBlogs }}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </MyContext.Provider>
  </>)
}
