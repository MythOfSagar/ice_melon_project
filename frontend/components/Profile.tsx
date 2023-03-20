import { MyContext, MyContextType } from "@/context/mycontext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import styles from '../styles/Profile.module.css'

type ProfileProps={
  userName:String
}

const Profile = ({userName}:ProfileProps) => {

  const router = useRouter();
  const { setData, data } = useContext<MyContextType>(MyContext);

  const LogOut = () => {
    setData({ token: null, userId: null, userName: null })
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
          src="https://i.ibb.co/VSXtCmT/Account-COVER.png"
          width={1000}
          height={100}
          alt="Cover photo"
        />
      </div>
      {/* Profile Photo */}
      <div className={styles.profilePhotoContainer}>
        <div className={styles.profilePhotoBorder}>
          <Image
            src={data.userName==='adminIceMelon' ? 
            "https://i.ibb.co/0ySKXVs/admin-Ice-Melon.png" :
            "https://i.ibb.co/Rvg1KvB/Cat-Profile.png"}

            width={300}
            height={300}
            alt="Profile photo"
          />
        </div>
      </div>
      {/* Buttons */}
      <h1 className={styles.userName}>{userName}</h1>
      <div className={styles.buttonsContainer}>
        <button
        
        
        style={{display:data.userName==='adminIceMelon' ? 'none' : 'block'}}
          onClick={() => router.push('/writeblog')}
          className={styles.followButton}>Write Blog</button>
        <button
          onClick={LogOut}
          className={styles.messageButton}>Log Out</button>
      </div>
    </div>
  );
};

export default Profile;
