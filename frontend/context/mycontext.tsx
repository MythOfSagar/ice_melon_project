import React from 'react';

export interface Blog {
    title: string,
    date: string,
    content: string,
    userName: string,
    category: string,
    favourites: any
}


export interface MyContextType {
    allBlogs: Blog[],
    setAllBlogs: (allBlogs: Blog[]) => void;
    data: string,
    setData: React.Dispatch<React.SetStateAction<string>>,
}



export let MyContext = React.createContext<MyContextType>({
    allBlogs: [],
    data: '',
    setAllBlogs: () => { },
    setData: () => { },
});



