import React, { useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MyContext, MyContextType } from '@/context/mycontext'

const Login = () => {
  const router = useRouter()
  const toast = useToast()
  const { data, setData } = useContext<MyContextType>(MyContext);

  const initialData = {
    password: "",
    userName: "",
    email: ""
  }

  const [userData, setUserData] = useState(initialData)

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

    await fetch(`https://ice-melon.onrender.com/users/logIn`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then(response => {
      if (response.ok) {
        localStorage.setItem("iceMelonUserName", userData.userName)
        setData(userData.userName)
        toast({
          title: 'Successfully Loged In',
          description: "You Can Continue Reading Blogs.",
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
        router.push('/')
      } else if (response.status === 401) {
        toast({
          title: `Wrong Password`,
          status: 'error',
          isClosable: true,
        })
      }
      else if (response.status === 402) {
        toast({
          title: `${userData.userName} not found.`,
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

      });


  }

  return (
    <div>
      <div className="form">
        <form method="post"
          onSubmit={handleSubmit}
          style={{ width: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          <label>UserName or Email</label>
          <input
            value={userData.userName}
            onChange={handleChange}
            type="text"
            title="userName" />
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

export default Login