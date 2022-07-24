
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { ContentContext } from '../context/Content';

//import { Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'
import Login from './Login'

const Auth = () => {

    const contentContext = useContext(ContentContext);

    const { token } = useParams();
    const [ authStatus, setAuthStatus ] = useState({})

    //console.log('token', token)

    useEffect(() => {
        contentContext.getAuthStatus()
            .then(result => {
                console.log('result auth ', result)
            })
    }, []);

    if (token === "failed") {
        return (
            <>
            El login ha fallado.
            </>
        )
    }

    localStorage.setItem('token', JSON.stringify((token ? token : "")));

    return (
        <Navigate to='/file'  />
    )
}

export default Auth;