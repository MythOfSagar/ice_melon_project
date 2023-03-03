import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Blog, chooseImage, serverUrl } from '@/context/mycontext';
import Image from 'next/image';
import styles from '@/styles/BlogCard.module.css'


interface blogProps {
    blog: Blog;
}

export default function blogPage({ blog }: blogProps) {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <Image
                className={styles.Image}
                alt={blog.category}
                src={chooseImage(blog.category)}
                width={350}
                height={200}
            ></Image>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${serverUrl}/blogs`);
    const blogs = await res.json();

    const paths = blogs.map((blog: Blog) => ({
        params: { id: blog._id },
    }));

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<blogProps> = async ({ params }) => {
    const res = await fetch(`${serverUrl}/blogs/${params?.id}`);
    const blog = await res.json();

    return { props: { blog } };
};
