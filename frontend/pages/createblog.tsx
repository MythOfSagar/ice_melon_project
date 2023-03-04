import React, { useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'
import Textarea from "../components/TextArea"
import Select from "../components/Select"
import { MyContext, MyContextType, serverUrl } from '@/context/mycontext'


const CreateBlog = () => {

  const toast = useToast()
  const { data } = useContext<MyContextType>(MyContext);

  const initialData = {
    title: "",
    date: '2022-10-20',
    content: "",
    category: "Tech",
    image: "",
    favourites:{a:true}
  }
  const options = [
    { value: 'Tech'},
    { value: 'Humour' },
    { value: 'Entertainment'},
    { value: 'Sports' },
    { value: 'Economy' }
  ]

  const [blogData, setBlogData] = useState(initialData)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { title, value } = event.target
    setBlogData({ ...blogData, [title]: value })
  }

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlogData({ ...blogData, content: event.target.value })
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBlogData({ ...blogData, category: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(blogData)
 
    await fetch(`${serverUrl}/blogs`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${data.token}`
      },
      body: JSON.stringify(blogData),
    }).then(response => {
      if (response.ok) {
        toast({
          title: 'Blog Posted.',
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
      
      });


  }

  return (
    <div>
      <div className="form">
        <form method="post"
          onSubmit={handleSubmit}
          style={{ width: 'fit-content', display: 'flex', flexDirection: 'column' }}>
          <label>Title:</label>
          <input
            value={blogData.title}
            onChange={handleChange}
            type="text"
            title="title" />
          <label>Category:</label>
          <Select
            value={blogData.category}
            onChange={handleSelectChange}
            options={options} />
          <label >Content:</label>
          <Textarea
            value={blogData.content}
            onChange={handleContentChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog