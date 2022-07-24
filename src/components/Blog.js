import { useContext, useEffect, useState } from 'react';
import { postApi } from '../lib/Api.js'

import { ContentContext } from '../context/Content';

import BlogPostItem from './BlogPostItem.js';

const Blog = () => {
    const contentContext = useContext(ContentContext);
    const [ contentList, setContentList ] = useState([]);

    /* const [ lang, setLang ] = useState(''); */
    const [ postList, setPostList] = useState({})

    const contentListKeys = [ 'title', 'category' ]

    const getPostList = async () => {
        //console.log('getPostList')
        return await postApi(
            'blog/post/list'
        )
    }

    useEffect(() => {
        contentContext.getListByLenguage(contentListKeys)
            .then(result => {
                setContentList(result)
            })
            .catch(e => console.log(e))

        getPostList()
            .then(result => {
                setPostList(result)
            })
            .catch(e => console.log(e)) 

    }, [])

    if(postList.result)
        return (
            <>
                { contentList.result.title.text }
                <hr></hr>
                {
                    postList.result.map((item) => 
                        <BlogPostItem
                            key={ item._id }
                            id={ item._id }
                            title={ item.title }
                            text={ item.text }
                        ></BlogPostItem>
                    ) 

                }
            </>
        )

    return (
        <>
        </>
    )
}

export default Blog;