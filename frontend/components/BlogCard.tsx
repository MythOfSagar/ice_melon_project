
import { chooseImage } from '@/context/mycontext'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/BlogCard.module.css'



type BlogCardProps = {
    title: string,
    date: string,
    category: string,
    content: string,
    username: string,
    _id: string
}



 const BlogCard = (BlogCardProp: BlogCardProps) => {

    const { _id, title, date, category, content, username } = BlogCardProp;

    return (
        <Link href={`/blogs/${_id}`}>
            <div className={styles.blogCard}>
                <div className={styles.imageContainer}>
                    <Image
                        className={styles.image}
                        alt={category}
                        src={chooseImage(category)}
                        width={350}
                        height={200}
                    />
                </div>
                <div className={styles.detailsContainer}>
                    <div className={styles.username}>{username}</div>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.content}>{content}</div>
                    <div className={styles.categoryDate}>
                        <div className={styles.category}>{category}</div>
                        <div className={styles.date}>{date}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard
