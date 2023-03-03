import React, { useState } from 'react'
import Select from "../components/Select"


type Props = {
    handleCategory: (category:string) => void;
  }

const Filter = ({handleCategory}:Props) => {

    const options = [
        { value: 'Select Category' },
        { value: 'Tech' },
        { value: 'Humour' },
        { value: 'Entertainment' },
        { value: 'Sports' },
        { value: 'Economy' }
    ]

    const [category, setCategory] = useState<string>('Select Category')

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
     
        setCategory(event.target.value)
        handleCategory(event.target.value)
        
    }

    return (
        <div>
            <label>Category:</label>
            <Select
                value={category}
                onChange={handleSelectChange}
                options={options} />
        </div>
    )
}

export default Filter