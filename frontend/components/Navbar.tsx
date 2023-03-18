import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { MyContext, MyContextType } from "@/context/mycontext";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Image from "next/image";



const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const { setData, data } = useContext<MyContextType>(MyContext);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      const iceMelonUser = localStorage.getItem('iceMelonUser');
      if (iceMelonUser) {
        setData(JSON.parse(iceMelonUser))
      }
    }
  }, [setData])

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              className={styles.Logo}
              alt={'Logo'}
              src={'https://i.ibb.co/YNjKSNc/IM-Logo.png'}
              width={140}
              height={50}
            />

          </Link>
        </div>
        <div className={styles.menuIcon} onClick={handleMenuClick}>
          {isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </div>
        <ul className={`${styles.menu} ${isOpen ? styles.show : ""}`}>
          <li>
            <Link href="/" legacyBehavior>
              <a onClick={() => setIsOpen(false)}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/writeblog" legacyBehavior>
              <a onClick={() => setIsOpen(false)}>Write Blog</a>
            </Link>
          </li>
          <li>
            <Link href="/signup" legacyBehavior>
              <a onClick={() => setIsOpen(false)}>Sign Up</a>
            </Link>
          </li>
          <li>
            <Link href={data.token ? '/account' : '/signin'} legacyBehavior>
              <a onClick={() => setIsOpen(false)}>{data.token ? 'Account' : 'Sign In'}</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
