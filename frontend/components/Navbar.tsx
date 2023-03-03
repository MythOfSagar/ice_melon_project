import React, { useContext, useEffect, useState} from 'react'
import Link from 'next/link';
import { MyContext, MyContextType, serverUrl} from '@/context/mycontext';




const Navbar = () => {
  //const [token, setToken] = useState<string>('');

  //const [allBlogs, setAllBlogs] = useState<Blog[]>([])

  const { data, setData, allBlogs, setAllBlogs } = useContext<MyContextType>(MyContext);


  const getBlogs = async () => {
    const resp = await fetch(`${serverUrl}/blogs`)
    const blogs = await resp.json()
    console.log(blogs)
    setAllBlogs(blogs)
  }

  useEffect(() => {
    if (allBlogs.length === 0) {
      getBlogs()
    }

    if (typeof window !== 'undefined') {
      const iceMelonUser = localStorage.getItem('iceMelonUser');
      if (iceMelonUser) {
        // setToken(storedToken)
        // setData(storedToken);
        setData(JSON.parse(iceMelonUser))
      }
    }
  }, [])
  return (
    <div>
        <Link href={'/'}><h2>Icon</h2></Link>
        <Link href={'/favourites'}><h2>Favourites</h2></Link>
        <Link href={'/createblog'}><h2>Create Blog</h2></Link>
        <Link href={'/register'}><h2>Register</h2></Link>
        <Link href={data.token ? '/account' : '/login' }><h2>{data.token ? 'Account' : 'Login' }</h2></Link>
    </div>
  )
}

export default Navbar