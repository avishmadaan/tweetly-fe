"use client"

import { useNotification } from "@/components/notification/notificationContext";
import { createContext, useContext, useEffect, useState } from "react";
import { domain } from "./utils";
import axios from "axios";

type BrainContextType = {
    saveTweetToBrain:(tweetId:string, categoryId:string) => Promise<boolean | undefined>
    // savedTweets: savedTweetsType[];
    filteredTweets:savedTweetsType[];
    deleteUserSavedTweet:(id:string) =>  Promise<boolean>
    savedCategories:savedCategoriesType[];
    deleteUserSavedCategory:(id:string) =>  Promise<boolean>
    saveCategoryToBrain:(categoryName:string) => Promise<boolean | undefined>
    filterTweets:(id:string) =>  Promise<void>
    selectedCategory:string
    filterBasedOnSearch:(query:string) => Promise<void>
    changeTweetCategory:(tweetIdPrimary:string, categoryId:string) => Promise<boolean | undefined>
   
  
}

type savedTweetsType = {
    id:string,
    tweetId:string,
    categoryId:string,
    username:string,
    description:string,
    category:{
        name:string
    }
}

type savedCategoriesType = {
    id:string,
    name:string
}

const BrainContext =  createContext<BrainContextType | undefined>(undefined);

export const BrainContextProvider = ({children}:{children:React.ReactNode}) => {
    const {showNotification} = useNotification();
     const [savedTweets, setSavedTweets] = useState<savedTweetsType[]>([]);
     const [categoryWiseTweets, setCategoryWiseTweets] = useState<savedTweetsType[]>([]);
     const [filteredTweets, setFilteredTweets] = useState<savedTweetsType[]>([]);
     const [savedCategories, setSavedCategories] = useState<savedCategoriesType[]>([]);
     const [selectedCategory, setSelectedCategory] = useState<string>("all");
     const [searchQuery, setSearchQuery] = useState<string>("");

     function extractTweetId(url:string):string | null {
        console.log("tweeturl", url)
        const match = url.match(/\/status\/(\d+)/);
        return match ? match[1]:null;
    }

    const saveTweetToBrain = async (tweetURL:string, categoryId:string) => {

        try {

            const tweetId = extractTweetId(tweetURL);
            console.log("TweetId", tweetId);

            if(!tweetId) {
                showNotification({
                    message:"Invalid Tweet Link",
                    type:"negative"
                })
                return;
            }

            console.log("categorySaved",categoryId)
            const URL = `${domain}/api/v1/user/content/add`;
            const result =  await axios.post(URL,{
                tweetId,
                categoryId
            },{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
              })
              findUsertweets();
              return true;
        

        }
        catch(err) {
            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;

        }

    }

    const deleteUserSavedTweet = async (id:string) => {

        try {

            const URL = `${domain}/api/v1/user/content/deletetweet/${id}`;
            const result =  await axios.delete(URL,{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
              })
              findUsertweets();
              return true;
        

        }
        catch(err) {
            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;

        }


    }

    const findUsertweets = async () => {

        try {
            const URL = `${domain}/api/v1/user/content/gettweets`;
            const result =  await axios.get(URL,{withCredentials:true});

            console.log("inside findUserTwwet");
            console.log(result.data.tweets)
            const tweets = result.data.tweets;
            setSavedTweets(tweets);
        }

        catch(err) {
            console.log(err);
            showNotification({
                message:"Error Getting Your Saved Tweets",
                type:"negative"
            })
        }

    }

    const saveCategoryToBrain = async (categoryName:string) => {

        try {


            const URL = `${domain}/api/v1/user/content/addcategory`;
            const result =  await axios.post(URL,{
                categoryName
            },{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
              })
              findUserCategories();
              return true;
        

        }
        catch(err) {
            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;

        }

    }

    const findUserCategories = async () => {

        try {
            const URL = `${domain}/api/v1/user/content/getcategories`;
            const result =  await axios.get(URL,{withCredentials:true});

            console.log(result.data.categories)
            setSavedCategories(result.data.categories);
        }

        catch(err) {
            console.log(err);
            showNotification({
                message:"Error Getting Your Saved Categories",
                type:"negative"
            })
        }

    }

    const deleteUserSavedCategory = async (id:string) => {

        try {

            const URL = `${domain}/api/v1/user/content/deletecategory/${id}`;
            const result =  await axios.delete(URL,{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
              })
              findUserCategories();
              return true;
        

        }
        catch(err) {
            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;

        }


    }

    const filterTweets = async (categoryId:string) => {
        
        setSelectedCategory(categoryId);
        console.log("Filter Category Called")
        if(categoryId == "all") {
         console.log(savedTweets);
        setCategoryWiseTweets(savedTweets);
        return;
        }
        const newTweets = savedTweets.filter((tweet) => tweet.categoryId === categoryId || null);
        console.log("new filtered tweets");
        console.log(newTweets);
        setCategoryWiseTweets(newTweets);
    }


    const filterBasedOnSearch = async (query:string) => {
        
        setSearchQuery(query);
        const newTweets = categoryWiseTweets.filter((tweet) => {

            if(tweet.description.toLowerCase().includes(query.toLowerCase()) || tweet.username.toLowerCase().includes(query)) {
              
                return true;
            }
            else {
                return false;
            }
        })

        setFilteredTweets(newTweets);


    }

    const changeTweetCategory = async (tweetIdPrimary:string, categoryId:string) => {

        try {

            const URL = `${domain}/api/v1/user/content/categoryupdate`;
            const result =  await axios.put(URL,{
                categoryId,
                tweetIdPrimary
            },{withCredentials:true});

            showNotification({
                message:result.data.message,
                type:"positive"
              })
              
              findUsertweets();
              return true;
        
              
        }
        catch(err) {
            console.log(err)
            showNotification({
              //@ts-expect-error  because of message
              message:err.response.data.message || "Internal Server Error",
              type:"negative"
            })
            return false;

        }


    }

    useEffect(() => {
        findUsertweets();
        findUserCategories();
    },[])

    useEffect(() => {
        if(savedTweets.length>0) {
            filterTweets(selectedCategory);
           
        }
    }, [selectedCategory, savedTweets])

    useEffect(() => {
            console.log("inside use effect of category wise")
            setFilteredTweets(categoryWiseTweets);
            filterBasedOnSearch(searchQuery);
        

    }, [categoryWiseTweets])
    

    return (
<BrainContext.Provider value={{saveTweetToBrain, deleteUserSavedTweet, savedCategories, deleteUserSavedCategory, saveCategoryToBrain, filteredTweets, filterTweets, selectedCategory, filterBasedOnSearch, changeTweetCategory}} >
            {children}
        </BrainContext.Provider>

    )

}

export const UseBrain = () => {
    const context = useContext(BrainContext);
      
    if (!context) {
        throw new Error("UseBrain must be used within an Brain Provider");
      }
      return context;

}