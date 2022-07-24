
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ContentContext } from '../context/Content';

const Index = () => {
    const contentContext = useContext(ContentContext);

    const [ contentList, setContentList ] = useState({});
    
    let { lang } = useParams();
    const contentListKeys = [ 'title', 'category' ]

    useEffect(() => {
        contentContext.getListByLenguage(contentListKeys, lang)
            .then(result => {
                console.log('result', result)
                setContentList(result)
            })
            .catch(e => console.log(e))

    }, [ lang ]);
    
    if(contentList && contentList.result) {
        return (
            <>
                { contentList.result.title.text }
                <hr></hr>
                { contentList.result.category ? contentList.result.category.text : '' }
            </>
        )
    }
        
    return (
        <>
        </>
    )
}

export default Index;