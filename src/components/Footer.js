import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ContentContext } from '../context/Content';

import Cookies from 'js-cookie';

const Footer = () => {
    const token = JSON.parse(localStorage.getItem('token'));

    const contentContext = useContext(ContentContext);

    const [ contentList, setContentList ] = useState({});
    
    let { lang } = useParams();
    const contentListKeys = [ 'my_token_is' ]

    useEffect(() => {
        contentContext.getListByLenguage(contentListKeys, lang)
            .then(result => {
                setContentList(result)
            })
            .catch(e => console.log(e))

    }, [ lang ]);
    
    if(contentList.result) {
        return (
            <>
                <hr></hr>
                <b>Footer</b><br></br>
                { token && `${ contentList.result.my_token_is.text}: ${ token }` }
                { Cookies.get('token') }
    
            </>
        )
    }

    return <></>
}

export default Footer;