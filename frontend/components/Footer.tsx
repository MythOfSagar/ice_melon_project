import React from 'react';
import Link from 'next/link';
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
                <Link href="/" legacyBehavior>
                  <a>About Us</a>
                </Link>
              </li>
              <li className={styles.item}>
                <Link href="/" legacyBehavior>
                  <a>Contact</a>
                </Link>
              </li>
              <li className={styles.item}>
                <Link href="/" legacyBehavior>
                  <a>Privacy Policy</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.social}>
          <h3 className={styles.subtitle}>Follow Us</h3>
          <ul className={styles.icons}>
            <li className={styles.icon}>
              <a href="https://www.facebook.com/icemelon">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className={styles.icon}>
              <a href="https://twitter.com/icemelon">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className={styles.icon}>
              <a href="https://www.instagram.com/icemelon">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.newsletter}>
          <h3 className={styles.subtitle}>Subscribe to Our Newsletter</h3>
          <form className={styles.form}>
            <input type="email" placeholder="Enter your email" className={styles.input} />
            <button type="submit" className={styles.button}>Subscribe</button>
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
