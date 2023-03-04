import React from 'react';
// import * as dotenv from 'dotenv' 
// dotenv.config()

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
    data: dataType,
    setData: React.Dispatch<React.SetStateAction<dataType>>,
}

export const chooseImage=(category:string)=>{
    switch (category) {

      case 'Tech':{ return 'https://i.ibb.co/QQ3L30x/n.jpg'}
      case 'Humour':{ return 'https://i.ibb.co/yF5yVvT/n.jpg'}
      case 'Entertainment':{ return 'https://i.ibb.co/jySNx3n/n.jpg'}
      case 'Sports':{ return 'https://i.ibb.co/HgtKm1H/n.jpg'}
      case 'Economy':{ return 'https://i.ibb.co/Dkyk34F/n.jpg'}

      default: return ""
    }
   }

export let MyContext = React.createContext<MyContextType>({
  
    data: {
        userId: null,
        token: null
    },
    
    setData: () => { },
});


export const serverUrl = 'https://ice-melon.onrender.com'  //process.env.serverUrl


