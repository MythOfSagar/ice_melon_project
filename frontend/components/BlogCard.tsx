
import { chooseImage } from '@/context/mycontext'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/BlogCard.module.css'



type BlogCardProps = {
    image: string,
    title: string,
    date: string,
    category: string,
    content: string,
    username: string,
    favourites: string,
    onClick: () => void,
    _id: string
}

const BlogCard = (BlogCardProp: BlogCardProps) => {

    const { image, title, date, category, content, username, favourites, onClick } = BlogCardProp

    return (
        <div className={styles.BlogCard}>
            <div>
                <div><Image
                    className={styles.Image}
                    alt={category}
                    src={chooseImage(category)}
                    width={350}
                    height={200}
                ></Image>
                </div>
                <div className={styles.username}><h1>{username}</h1></div>
                <div className={styles.contentTitle}>
                    <h2>{title}</h2>
                    <h4>{content}</h4>
                </div>
                <div className={styles.categoryDate}>
                    <h3>{category}</h3>
                    <h3>{date}</h3>
                </div>
            </div>
            <div>
                <button onClick={onClick}>{favourites}</button>
            </div>
        </div>
    )
}

export default BlogCard