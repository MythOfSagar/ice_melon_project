import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import { dataType, MyContext } from '../context/mycontext'
import Footer from '@/components/Footer';


export default function App({ Component, pageProps }: AppProps) {

  const [data, setData] = useState<dataType>({
    userId: null,
    token: null,
    userName: null
  })


  return (<div className='Body'>
    <MyContext.Provider value={{ data, setData }}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer/>
      </ChakraProvider>
    </MyContext.Provider>
  </div>)
}
