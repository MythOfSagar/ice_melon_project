
import { useRouter } from 'next/router';
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react';
import { Blog, MyContext, MyContextType, serverUrl } from '@/context/mycontext';
import BlogCard from '@/components/BlogCard';
import { useDisclosure } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast
} from '@chakra-ui/react'

import { Textarea } from "@chakra-ui/react"
import Select from "../components/Select"
type Option = {
  value: string;
  label: string;
}



export default function Account() {

  const [currentBlog, setCurrentBlog] = useState<Blog>({
    title: "",
    date: "",
    content: "",
    userName: "",
    creator: "",
    category: "",
    favourites: {},
    _id: ""
  })

  const toast = useToast()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { title, value } = event.target
    setCurrentBlog({ ...currentBlog, [title]: value })
  }

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentBlog({ ...currentBlog, content: event.target.value })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentBlog({ ...currentBlog, category: event.target.value })
  }

 
  const handleSubmit = async () => {
    

    console.log(currentBlog)

    setStateBlogs(stateBlogs.map((blog: Blog) => {

      if (blog._id === currentBlog._id) {
        return currentBlog
      }
      return blog
    }))
 
    await fetch(`${serverUrl}/blogs/edit/${currentBlog._id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${data.token}`
      },
      body: JSON.stringify(currentBlog),
    }).then(response => {
      if (response.ok) {
        toast({
          title: 'Blog Edited.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        })
      }
      else {
        console.log(response)
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

onClose()
  }
  
 

  const options = [
    { value: 'Tech'},
    { value: 'Humour' },
    { value: 'Entertainment'},
    { value: 'Sports' },
    { value: 'Economy' }
  ]

  const router = useRouter();
  const { allBlogs, data, setAllBlogs, setData } = useContext<MyContextType>(MyContext);
  const [stateBlogs, setStateBlogs] = useState<Blog[]>(allBlogs)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  

  const LogOut = () => {
    setData({ token: null, userId: null })
    if (typeof window !== 'undefined') {
      router.push('/')
      localStorage.clear()
    }
  }
  const getBlogs = async () => {
    const resp = await fetch(`${serverUrl}/blogs`)
    const blogs = await resp.json()

    setAllBlogs(blogs)
    console.log(blogs, '%%%', allBlogs)
    setStateBlogs(blogs)
  }

  const handleEdit = async (blogId: string) => {

    setCurrentBlog(stateBlogs.filter((blog)=>blog._id===blogId)[0])

    onOpen()
  }
  const handleDelete = async (blogId: string) => {

    setStateBlogs(stateBlogs.filter((blog: Blog) => blog._id !== blogId))

    await fetch(`${serverUrl}/blogs/delete/${blogId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        "authorization": `${data.token}`
      }
    }).then(res => console.log("Deleted from Your Blogs"))
  }

  const handleFavourites = async (status: boolean, blogId: string) => {
    if (!data.token) {
      console.log("Login to Add to Favourite")
    } else {
      if (status) {
        setStateBlogs(stateBlogs.map((blog: Blog) => {

          if (blog._id === blogId) {
            const temp = blog
            temp['favourites'][`${data.userId}`] = false
            return temp
          }

          return blog
        }))
        await fetch(`${serverUrl}/blogs/removefromfavourite/${blogId}`, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            "authorization": `${data.token}`
          }
        }).then(res => console.log("Removed from Favourite", status))

      } else {


        setStateBlogs(stateBlogs.map((blog: Blog) => {

          if (blog._id === blogId) {
            const temp = blog
            temp['favourites'][`${data.userId}`] = true
            return temp
          }

          return blog
        }))

        await fetch(`${serverUrl}/blogs/addtofavourite/${blogId}`, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            "authorization": `${data.token}`
          }
        }).then(res => console.log("Removed from Favourite", status))


      }
    }

  }

  useEffect(() => {

    getBlogs()

  }, [])

  return (
    <>
      <Head>
        <title>Favourites</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <>



          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
              <div className="form">
        <form method="post"
          onSubmit={handleSubmit}
          style={{ width: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          <label>Title:</label>
          <input
            value={currentBlog.title}
            onChange={handleChange}
            type="text"
            title="title" />
          <label>Category:</label>
          <Select
            value={currentBlog.category}
            onChange={handleSelectChange}
            options={options} />
          <label >Content:</label>
          <Textarea
            value={currentBlog.content}
            onChange={handleContentChange} />
          
        </form>
      </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={handleSubmit}
                 colorScheme='blue' mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        <div>
          {stateBlogs.map(((blog, i) => {
            if (blog.creator === data.userId) return <div key={i}><BlogCard
              onClick={() => handleFavourites(blog.favourites[`${data.userId}`], blog._id)}

              favourites={blog.favourites[`${data.userId}`] ? "Remove" : "Add"}
              category={blog.category}
              image={`https://i.ibb.co/jWTQB1f/IMG-20230219-012652.jpg`}
              content={blog.content}
              date={blog.date}
              title={blog.title}
              username={blog.userName}
              key={i}
              _id={blog._id}
            ></BlogCard>
              <button onClick={() => handleEdit(blog._id)}>Edit</button>
              <button onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          }
          ))}
        </div>
        <div>
          <button onClick={LogOut}>LogOut</button>
        </div></>
    </>

  )
}