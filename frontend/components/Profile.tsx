import { MyContext, MyContextType } from "@/context/mycontext";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from '../styles/Profile.module.css'

const Profile = () => {

    const router = useRouter();
    const { setData ,data} = useContext<MyContextType>(MyContext);

    const LogOut = () => {
        setData({ token: null, userId: null,userName:null })
        if (typeof window !== 'undefined') {
          router.push('/')
          localStorage.clear()
        }
      }

  return (
    <div className={styles.container}>
      {/* Cover Photo */}
      <div className={styles.coverPhoto}>
        <img
          src="https://i.ibb.co/VSXtCmT/Account-COVER.png"
          alt="Cover photo"
        />
      </div>
      {/* Profile Photo */}
      <div className={styles.profilePhotoContainer}>
        <div className={styles.profilePhotoBorder}>
          <img
            src="https://i.ibb.co/Rvg1KvB/Cat-Profile.png"
            width={556}
            height={556}
            alt="Profile photo"
          />
        </div>
      </div>
      {/* Buttons */}
      <h1 className={styles.userName}>{data.userName}</h1>
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
