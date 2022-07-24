import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getApi } from '../lib/Api.js'

import BlogPostDetail from './BlogPostDetail.js';

const BlogPostContainer = (p) => {

    const { idPost } = useParams();

    const [ postItem, setPostItem] = useState({})

    const getPostItem = async () => {
        return await getApi(
            'blog/post', 
            idPost
        )
    }

    useEffect(() => {
        getPostItem()
            .then(result => {
                setPostItem(result)
            })
            .catch(e => console.log(e))

    }, [])

    //console.log('postItem.result.title', postItem.result)

    if(postItem.result)
        return (
            <>
                <BlogPostDetail 
                    title={ postItem.result.title }
                    text={ postItem.result.text }
                ></BlogPostDetail>
            </>
        )
    
    return (
        <>
        </>
    )
}

export default BlogPostContainer;