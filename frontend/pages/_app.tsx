import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react';
import { Blog, dataType, MyContext, MyContextType, serverUrl } from '../context/mycontext'

export default function App({ Component, pageProps }: AppProps) {

  const [token, setToken] = useState<string>('');

  const [allBlogs, setAllBlogs] = useState<Blog[]>([])
  const [data, setData] = useState<dataType>({
    userId: null,
    token: null
})


  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token') || "";
      if (storedToken.length > 0) {
        setToken(storedToken)
        
        console.log(storedToken, "%%%%", token, "%%%%", data)
      }
    }
  }, [])

  return (<>
    <MyContext.Provider value={{ data, setData, allBlogs, setAllBlogs }}>
      <ChakraProvider>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </MyContext.Provider>
  </>)
}
