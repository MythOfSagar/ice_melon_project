import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import { Blog, dataType, MyContext } from '../context/mycontext'

export default function App({ Component, pageProps }: AppProps) {




 


  const [data, setData] = useState<dataType>({
    userId: null,
    token: null
  })


  return (<>
    <MyContext.Provider value={{ data, setData }}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </MyContext.Provider>
  </>)
}
