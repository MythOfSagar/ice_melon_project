import React from 'react';
import Link from 'next/link';
import { Icon } from "@chakra-ui/react"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import styles from '../styles/Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <h2 className={styles.title}>Ice Melon</h2>
          <nav>
            <ul className={styles.list}>
              <li className={styles.item}>
                
                  <a>About Us</a>
               
              </li>
              <li className={styles.item}>
                
                  <a>Contact</a>
               
              </li>
              <li className={styles.item}>
                
                  <a>Privacy Policy</a>
               
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.social}>
          <h3 className={styles.subtitle}>Follow Us</h3>
          <ul className={styles.icons}>
            <li className={styles.icon}>
              <a target='_blank' href="https://github.com/Sagar1079/ice_melon_project">
                <Icon as={FaTwitter} />
              </a>
            </li>
            <li className={styles.icon}>
              <a target='_blank' href="https://github.com/Sagar1079/ice_melon_project">
                <Icon as={FaFacebook} />
              </a>
            </li>
            <li className={styles.icon}>
              <a target='_blank' href="https://github.com/Sagar1079/ice_melon_project">
                <Icon as={FaInstagram} />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.newsletter}>
          <h3 className={styles.subtitle}>Subscribe to Our Newsletter</h3>
          <form className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.input} />
            <button
              type="submit"
              className={styles.button}

            >Subscribe</button>
          </form>
        </div>
      </div>
      <div className={styles.copy}>
        <p>&copy; 2023 Ice Melon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
