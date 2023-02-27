import React, { useContext, useEffect } from 'react'
import Link from 'next/link';
import { MyContext, MyContextType } from '@/context/mycontext';




const Navbar = () => {

  const { data, setData,allBlogs,setAllBlogs } = useContext<MyContextType>(MyContext);
  const isAuth=true

  
   const getBlogs = async () => {
    const resp = await fetch('https://ice-melon.onrender.com/blogs')
    const data = await resp.json()
    setAllBlogs(data)
  }

  useEffect(()=>{
    if(allBlogs.length===0)
    {
      getBlogs()
    }
  },[])

  return (
    <div>
        <Link href={'/'}><h2>Icon</h2></Link>
        <Link href={'/favourites'}><h2>Favourites</h2></Link>
        <Link href={'/createblog'}><h2>Create Blog</h2></Link>
        <Link href={'/register'}><h2>Register</h2></Link>
        <Link href={isAuth ? '/account' : '/login' }><h2>{isAuth ? 'Account' : 'Login' }</h2></Link>
    </div>
  )
}

export default Navbar