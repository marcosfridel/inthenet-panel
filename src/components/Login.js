
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { ContentContext } from '../context/Content';

const Login = () => {
    const contentContext = useContext(ContentContext);
    
    const [ contentList, setContentList ] = useState({});

    const [ email, setEmail ] = useState("marcosfridel@gmail.com");
    const [ password, setPassword ] = useState("password");
    const [ authStatus, setAuthStatus ] = useState({})

    const onChangeTextEmail = (text) => setEmail(text.value);
    const onChangeTextPassword = (text) => setPassword(text.value);

    let { lang } = useParams();
    const contentListKeys = [ 'login_sad' ]

    useEffect(() => {
        contentContext.getAuthStatus()
            .then(result => {
                console.log('useEffect')
                setAuthStatus(result)
            })
    }, []);

    useEffect(() => {
        contentContext.getListByLenguage(contentListKeys, lang)
            .then(result => {
                setContentList(result)
            })
            .catch(e => console.log(e))

    }, [ lang ]);

    const handleSignInClick = () => {
        window.open("http://localhost:8080/auth/fb/signin", "_self");
    };

    if(contentList.result && authStatus) {
        if(authStatus.type !== 'success'){
            return (
                <>
                    <p>{ contentList.result.login_sad.text }</p>
                    <hr></hr>
                    <b>Facebook</b><br></br>
                    <a href="http://localhost:8080/auth/fb/signin">
                        Iniciar Sesion con Facebook
                    </a>
                    <br></br>
                    <b>Google</b><br></br>
                    <a href="http://localhost:8080/auth/google/signin">
                        Iniciar Sesion con Google
                    </a>
                    <br></br>
                    <b>Instagram</b><br></br>
                    <a href="http://localhost:8080/auth/ig/signin">
                        Iniciar Sesion con Instagram
                    </a>
                    <br></br>
                    <b>Facebook 2.0</b><br></br>
                    <ul className="menu">
                        <li onClick={ () => { handleSignInClick() } }>
                            Facebook 2.0
                        </li>

                    </ul>
                    <br></br>
                    <b>Local</b><br></br>
                    <form action="http://localhost:8080/auth/local/signin" method="post">
                        <input type="text" name="username" placeholder="Email" value={ email } onChange={ onChangeTextEmail } ></input><br></br>
                        <input type="text" name="password" placeholder="Password" value={ password } onChange={ onChangeTextPassword }></input><br></br>
                        <input type="submit" name="ingresar" value="Ingresar" ></input><br></br>
                    </form>
                    <br></br>
                </>
            )
        }

        if(authStatus.type === 'success'){
            return (
                <>
                    <b>Logout</b><br></br>
                    Provider: { authStatus.result.provider } - Id: { authStatus.result.id }
                    <br></br>
                </>
            )            

        }

    }
    
    return (
        <>
        </>
    )
}

export default Login;