import React from 'react';

type favouritesType = Record<string, boolean>;

export interface Blog {
    title: string,
    date: string,
    content: string,
    userName: string,
    creator:string,
    category: string,
    favourites: favouritesType,
    _id: string
}

export interface dataType {
    userId: string | null,
    token: string | null
}

export interface MyContextType {
    allBlogs: Blog[],
    setAllBlogs: (allBlogs: Blog[]) => void;
    data: dataType,
    setData: React.Dispatch<React.SetStateAction<dataType>>,
}



export let MyContext = React.createContext<MyContextType>({
    allBlogs: [],
    data: {
        userId: null,
        token: null
    },
    setAllBlogs: () => { },
    setData: () => { },
});


export const serverUrl = 'http://localhost:7777'


