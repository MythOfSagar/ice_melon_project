import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Blog, chooseImage, serverUrl } from '@/context/mycontext';
import Image from 'next/image';
import styles from '@/styles/BlogCard.module.css'
import { Box, Text, Heading } from '@chakra-ui/react';
import Head from 'next/head'


interface blogProps {
    blog: Blog;
}

export default function BlogPage({ blog }: blogProps) {
    const router = useRouter();

    let blogContent = blog ? blog.content.split(".") : []

    let blogContentPara = []
    let para = ""
    for (let i = 0; i < blogContent.length; i++) {
        para += `${blogContent[i]}.`
        if (i % 2 === 0) {
            blogContentPara.push(para)
            para = ""
        }
    }

    if (router.isFallback) {
        return <div>Loading...</div>;
    }
 
    return (<> <Head>
        <title>{`${blog.title} | Ice Melon`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>
        <div style={{ width: '80%', margin: '100px auto 20px auto' }}>

            <Heading
                margin={'auto'}
                width={'fit-content'}
                mb={"30px"}
            
            >{blog.title}</Heading>
            <Box
                margin={'auto'}
                width={'fit-content'}>
                <Image
                    className={styles.Image}
                    alt={blog.category}
                    src={chooseImage(blog.category)}
                    width={700}
                    height={200}
                    style={{
                        marginBottom:"30px"
                    }}
                ></Image></Box>
            {blogContentPara.map((content,i) => {

                return (<div key={i}><Text fontSize={20}>{content}</Text></div>)
            })}

        </div>
    </>);
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

    return { props: { blog }, revalidate: 10 };
};
