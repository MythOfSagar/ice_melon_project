
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

    const briefContent = content.slice(0, 80) + '...'


    const data = date.slice(0, 10).split("-").map(Number)

    const dateString = `${data[2]} ${getMonth(data[1])} ${data[0]}`



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
                    <div className={styles.content}>{briefContent}</div>
                    <div className={styles.categoryDate}>
                        <div className={styles.category}>{category}</div>
                        <div className={styles.date}>{dateString}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard




const getMonth = (N: number) => {
    switch (N) {

        case 1: return 'January'
        case 2: return 'February'
        case 3: return 'March'
        case 4: return 'April'
        case 5: return 'May'
        case 6: return 'June'
        case 7: return 'July'
        case 8: return 'August'
        case 9: return 'September'
        case 10: return 'October'
        case 11: return 'November'
        case 12: return 'December'


        default: return true
    }
}