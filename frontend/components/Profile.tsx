import { MyContext, MyContextType } from "@/context/mycontext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from '../styles/Profile.module.css'

const Profile = () => {

    const router = useRouter();
    const { setData } = useContext<MyContextType>(MyContext);

    const LogOut = () => {
        setData({ token: null, userId: null })
        if (typeof window !== 'undefined') {
          router.push('/')
          localStorage.clear()
        }
      }

  return (
    <div className={styles.container}>
      {/* Cover Photo */}
      <div className={styles.coverPhoto}>
        <Image
          src="https://i.ibb.co/WPh4Zqg/ABhi.png"
          alt="Cover photo"
          width={356}
            height={128}
        />
      </div>
      {/* Profile Photo */}
      <div className={styles.profilePhotoContainer}>
        <div className={styles.profilePhotoBorder}>
          <Image
            src="https://i.ibb.co/WPh4Zqg/ABhi.png"
            width={556}
            height={556}
            alt="Profile photo"
          />
        </div>
      </div>
      {/* Buttons */}
      <div className={styles.buttonsContainer}>
        <button 
        onClick={()=>router.push('/writeblog')} 
        className={styles.followButton}>Write Blog</button>
        <button 
        onClick={LogOut} 
        className={styles.messageButton}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
