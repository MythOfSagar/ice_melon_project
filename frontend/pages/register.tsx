import React, { useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { MyContext, MyContextType, serverUrl } from '@/context/mycontext'
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()
  const toast = useToast()
  const { setData } = useContext<MyContextType>(MyContext);

  const initialData = {
    email: "",
    password: "",
    userName: ""
  }

  const [userData, setUserData] = useState(initialData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { title, value } = e.target

    setUserData({ ...userData, [title]: value })

  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await fetch(`${serverUrl}/users/signIn`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(response => {
      if (response.ok) {
        setData({
          userId: null,
          token: null
      })
        if (typeof window !== 'undefined') {
          localStorage.clear()
        }
        router.push('/login')
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
      } else if (response.status === 409) {
        toast({
          title: `Email Already Exists, You Can Login Back.`,
          status: 'error',
          isClosable: true,
        })
      }
      else if (response.status === 410) {
        toast({
          title: `UserName Already Exists, Please choose another One.`,
          status: 'error',
          isClosable: true,
        })
      }
      else {
        toast({
          title: `Error Occured Please Try Again.`,
          status: 'error',
          isClosable: true,
        })
      }
    })
      .catch(error => {
        console.error(error);
        toast({
          title: `Error Occured Please Try Again.`,
          status: 'error',
          isClosable: true,
        })
      });


  }

  return (
    <div>
      <div className="form">
        <form method="post"
          onSubmit={handleSubmit}
          style={{ width: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          <label>UserName:</label>
          <input
            value={userData.userName}
            onChange={handleChange}
            type="text"
            title="userName" />
          <label >Email:</label>
          <input
            value={userData.email}
            onChange={handleChange}
            type="email"
            title="email" />
          <label >Password:</label>
          <input
            value={userData.password}
            onChange={handleChange}
            type="password"
            title="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Register