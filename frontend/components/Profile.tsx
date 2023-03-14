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
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJCsloaZ5KELcnt7DHHHVcoEuaUuR05B7XdpfRAKLUrz8C5d7aI67hEo1Pjs74hylGqdo&usqp=CAU"
          alt="Cover photo"
          style={{
            "width":"100%",
              "height":"400px", 
          }}
        />
      </div>
      {/* Profile Photo */}
      <div className={styles.profilePhotoContainer}>
        <div className={styles.profilePhotoBorder}>
          <img
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=600"
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
