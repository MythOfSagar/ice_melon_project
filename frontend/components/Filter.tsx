import React, { useState } from 'react'
import Select from "../components/Select"
import Image from 'next/image'
import styles from '../styles/Filter.module.css'
import { useRouter } from 'next/router'

type Props = {
    handleCategory: (category: string) => void;
    path:string,
    allowQuery: boolean
}

const Filter = ({ handleCategory,path,allowQuery }: Props) => {
    const router = useRouter()
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

        if (event.target.value === 'Select Category' && allowQuery) {
            router.push(path)
        } else if(allowQuery) {
            router.push({
                pathname: path,
                query: { category: event.target.value },
            });

        }
        setCategory(event.target.value)
        handleCategory(event.target.value)

    }

    return (
        <div className={styles.Filter}>
            <Image
                alt={'Filter'}
                src={'https://i.ibb.co/2t3MFqp/Filter.png'}
                width={40}
                height={40}
            />
            <Select className={styles.Select}
                value={category}
                onChange={handleSelectChange}
                options={options} />
        </div>
    )
}

export default Filter