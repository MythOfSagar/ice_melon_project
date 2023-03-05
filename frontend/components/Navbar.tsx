import React, { useContext, useEffect } from 'react'
import Link from 'next/link';
import { MyContext, MyContextType } from '@/context/mycontext';
import styles from '../styles/Navbar.module.css'



const Navbar = () => {

  const { setData, data } = useContext<MyContextType>(MyContext);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const iceMelonUser = localStorage.getItem('iceMelonUser');
      if (iceMelonUser) {
        setData(JSON.parse(iceMelonUser))
      }
    }
  }, [])
  return (
    <div className={styles.navbar}>
      <Link href={'/'} legacyBehavior>
        <a className={styles.logo}>
          Icon
        </a>
      </Link>

      <Link href={'/createblog'} legacyBehavior>
        <a className={styles.navLink}>Create New Blog</a>
      </Link>

      <Link href={'/register'} legacyBehavior>
        <a className={styles.navLink}>Sign Up</a>
      </Link>

      <Link href={data.token ? '/account' : '/login'} legacyBehavior>
        <a className={styles.navLink}>{data.token ? 'Account' : 'Sign In'}</a>
      </Link>
    </div>
  )
}

export default Navbar