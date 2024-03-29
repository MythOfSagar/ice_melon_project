import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react';
import { Blog, MyContext, MyContextType, serverUrl } from '@/context/mycontext';
import BlogCard from '@/components/BlogCard';
import { Box, useDisclosure } from '@chakra-ui/react'
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

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import stylesBlogsDiv from '../styles/Home.module.css'
import styles from '../styles/WriteBlog.module.css'
import { Textarea } from "@chakra-ui/react"
import Select from "../components/Select"
import Filter from '@/components/Filter';
import Profile from '@/components/Profile';
import NoBlogFound from '@/components/NoBlogFound';



type staticBlogsProps = {
  staticBlogs: Blog[]
}

export default function Account({ staticBlogs }: staticBlogsProps) {

  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data } = useContext<MyContextType>(MyContext);

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
 

  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState<string>('Select Category')
  const [displayCategory, setDisplayCategory] = useState<boolean>(false)
  const [stateBlogs, setStateBlogs] = useState<Blog[]>(staticBlogs)
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

    setLoading(true)

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
        setStateBlogs(stateBlogs.map((blog: Blog) => {

          if (blog._id === currentBlog._id) {
            return currentBlog
          }
          return blog
        }))
        setLoading(false)

      }
      else {
        console.log(response)
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
        toast({
          title: `Error Occured Please Try Again.`,
          status: 'error',
          isClosable: true,
        })
        setLoading(false)
      });

    onClose()
  }


  const options = [
    { value: 'Tech' },
    { value: 'Humour' },
    { value: 'Entertainment' },
    { value: 'Sports' },
    { value: 'Economy' }
  ]



  const handleEdit = (blogId: string) => {
    setCurrentBlog(stateBlogs.filter((blog) => blog._id === blogId)[0])
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
    }).then(res => toast({
      title: `Blog Deletion Successfull.`,
      status: 'success',
      isClosable: true,
    })
    ).catch((err) => toast({
      title: `Error Occured Please Try Again.`,
      status: 'error',
      isClosable: true,
    }))
  }

  useEffect((
  ) => {
    if(data.userName!=='adminIceMelon'){
      staticBlogs
      .forEach((blog: Blog) => {
        if (blog.creator === data.userId) {
          setDisplayCategory(true)
          return
        }
      })
    }else{
      setDisplayCategory(true)
    }
    
  }, [data, staticBlogs])



 

  useEffect(() => {
    if(data.userName==='adminIceMelon'){
      if (category !== 'Select Category') {
        setStateBlogs(staticBlogs.filter((blog: Blog) =>
          blog.category === category))
      }else{
        setStateBlogs(staticBlogs)
      }
    }else{
      if (category !== 'Select Category') {
        setStateBlogs(staticBlogs.filter((blog: Blog) =>
          blog.category === category &&
          blog.creator === data.userId))
  
      } else {
        setStateBlogs(staticBlogs.filter((blog: Blog) => blog.creator === data.userId))
      }
    }
    
  }, [category, data, staticBlogs])



  return (
    <>
      <Head>
        <title>{data.userName==='adminIceMelon' ? 'Admin' : 'Account'} | Ice Melon</title>
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
        
            size={'3xl'}
          >
            <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
             />
            <ModalContent border={'2px solid red'} >
              <ModalHeader>Edit Your Blog</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}  >
                <div className="form">
                  <form method="post"
                    onSubmit={handleSubmit}
                    style={{width:'100%', margin:'auto'}}
                    className={styles.Form}>
                    <label>Title:</label>
                    <input
                      value={currentBlog.title}
                      className={styles.Input}
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
                  isLoading={loading}
                  loadingText='Editing'
                  onClick={handleSubmit}
                  colorScheme='blue'
                  mr={3}>
                  Edit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>

        <Box
          width="fit-content"
          margin={`80px auto 10px auto`}
        >

          <Profile userName={`${data.userName}`}/>
          <>{displayCategory ? <Filter
           allowQuery={false}
            path='/account'
            handleCategory={(category) => setCategory(category)}></Filter> : <></>}</>
          <div 
        
           className={stylesBlogsDiv.AllBlogs}>
            {stateBlogs.length === 0 ? <NoBlogFound  /> : 
            stateBlogs.map(((blog, i) => (<div key={i}>
              <BlogCard category={blog.category}
                content={blog.content}
                date={blog.date}
                title={blog.title}
                username={blog.userName}
                key={i}
                _id={blog._id}
              ></BlogCard>
              <Box
                display={'flex'}
                gap={7}
                width={'fit-content'}
                margin='auto'
                mt={"30px"}>
                <Button
                  type="submit"
                  backgroundColor={'#4caf50'}
                  marginTop={'12px'}
                  colorScheme={'telegram'}
                  color={'#fff'}
                  leftIcon={<EditIcon />}
                  onClick={() => handleEdit(blog._id)}>Edit</Button>
                <Button
                  type="submit"
                  backgroundColor={'#4caf50'}
                  marginTop={'12px'}
                  colorScheme={'telegram'}
                  color={'#fff'}
                  leftIcon={<DeleteIcon />}
                  onClick={() => handleDelete(blog._id)}>Delete</Button>
              </Box>
            </div>)
            ))}
          </div>
        </Box>
      </>
    </>

  )
}




export async function getStaticProps() {
  const res = await fetch(`${serverUrl}/blogs`)
  const data = await res.json()

  return {
    props: {
      staticBlogs: data
    },
    revalidate: 10
  };
}