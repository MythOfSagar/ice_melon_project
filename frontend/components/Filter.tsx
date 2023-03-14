import React, { useState } from 'react'
import Select from "../components/Select"

import styles from '../styles/Filter.module.css'


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
        <div className={styles.div}>
            <label className={styles.label}>Choose your favourite Category :</label>
            <Select className={styles.Select}
                value={category}
                onChange={handleSelectChange}
                options={options} />
        </div>
    )
}

export default Filter