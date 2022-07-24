import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { getApi } from '../lib/Api'

import { Routes, Route, Navigate } from 'react-router-dom';

import { ContentContext } from '../context/Content';



const NavBar = () => {

/*     const style = () => {
        backgroundColor: 'red'
    } */

    const contentContext = useContext(ContentContext);

    const [ authStatus, setAuthStatus ] = useState({})
    const [ logoutOk, setLogoutOk ] = useState(false)

    useEffect(() => {
        contentContext.getAuthStatus()
            .then(result => {
                setAuthStatus(result)
            })
    }, []);

    const onClickLogout = async () => {
        await getApi(
            'auth/logout'
            )
            .then(result => {
                //console.log(result);
                setLogoutOk(true)
                setAuthStatus(authStatus.type === 'success' ? 'error' : 'success')
            })
    }


    if(logoutOk){
        setLogoutOk(false);
        return (
            <Navigate to='/login' replace={true}  />          
        )

    }
        {/* <Navigate to='/login' replace={true}  /> */}

    let navLink = <></>
    if (authStatus) {
        //console.log('authStatus ', authStatus)
        if(authStatus.type !== 'success'){
            navLink = 
                <>
                <hr/>
                <NavLink to="/login">Login</NavLink> 
                </>
        }
        if(authStatus.type === 'success'){
            navLink = 
                <>
                <hr/>
                <input type="submit" value="Logout" onClick={() => { onClickLogout() } }></input>
                {/* <a href="http://localhost:8080/auth/logout">Logout</a> */}
                </>
        }
    }

    return (
        <>
            <div style={ { "backgroundColor": "red" } } >
                <NavLink to="/sp">Español</NavLink> / <NavLink to="/en">Inglés</NavLink> 
                <hr/>
                <NavLink to="/blog">Blog</NavLink> 
                <hr/>
                <NavLink to="/chat">Chat</NavLink> 
                <hr/>
                File: 
                <NavLink to="/file">Ver</NavLink> | 
                <NavLink to="/file/upload">Subir</NavLink> 
                { navLink }
                <hr></hr>

            </div>
        </>
    )
}

export default NavBar;