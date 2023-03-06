import React, { useContext, useState } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import { MyContext, MyContextType, serverUrl } from '@/context/mycontext'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../styles/Sign.module.css'

const SignIn = () => {


  const router = useRouter()
  const toast = useToast()
  const { data, setData } = useContext<MyContextType>(MyContext);

  const initialData = {
    password: "",
    userName: "",
    email: ""
  }

  const [userData, setUserData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { title, value } = e.target
    if (title === 'userName') {
      setUserData({ ...userData, email: value, userName: value })
    } else {
      setUserData({ ...userData, [title]: value })
    }



  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await fetch(`${serverUrl}/users/logIn`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(async (response) => {
      if (response.ok) {
        const details = await response.json()
        console.log(details)
        localStorage.setItem("iceMelonUser", JSON.stringify(details))
        setData(details)
        toast({
          title: 'Successfully Loged In',
          description: "You Can Continue Reading Blogs.",
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
        setLoading(false)
        router.push('/')
      } else if (response.status === 401) {
        toast({
          title: `Wrong Password`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      }
      else if (response.status === 402) {
        toast({
          title: `${userData.userName} not found.`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      }
      else {
        toast({
          title: `Error Occured Please Try Again.`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      }
    })
      .catch(error => {
        console.error(error);

      });


  }

  return (
    <><Head>
      <title>Sign In | Ice Melon</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <div
        className={styles.signUpPage}

      >
        <form
          className={styles.signUpForm}

          onSubmit={handleSubmit}
        >
          <label

            className={styles.Label}
            htmlFor="username"
          >
            Username or Email
          </label>
          <input
            className={styles.Input}
            value={userData.userName}
            onChange={handleChange}
            type="text"
            title="userName"
            required
          />



          <label
            className={styles.Label}
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={styles.Input}
            value={userData.password}
            onChange={handleChange}
            type="password"
            title="password"
            required
          />

          <Button

            isLoading={loading}
            loadingText='Loading'
            type="submit"
            backgroundColor={'#4caf50'}
            colorScheme={'telegram'}
            color={'#fff'}
          >
            Sign In
          </Button>
        </form>
      </div>
    </>);
};

export default SignIn;

