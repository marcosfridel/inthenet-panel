import { useContext, useEffect, useState } from 'react';

import { ContentContext } from '../context/Content';

const Chat = () => {
    //console.log('Chat')
    const contentContext = useContext(ContentContext);
    const [ contentList, setContentList ] = useState([]);    

    const contentListKeys = [ 'title', 'category' ]

    useEffect(() => {
        contentContext.getListByLenguage(contentListKeys)
            .then(result => {
                setContentList(result)
            })
            .catch(e => console.log(e))
    }, [])

    const [textReceive, setTextReceive] = useState('');
    const [textSend, setSendText] = useState('');
    
    const webSocket = new WebSocket("ws://localhost:8081");
    
    useEffect(() => {
        webSocket.onopen = (event) => {
            console.log("Chat conectado");
        };

    }, [])
    
    webSocket.onclose = function (event) {
        console.log("Chat desconectado");
    };
    
    webSocket.onmessage = function (event) {
        setTextReceive(event.data);
    };

    const sendMessage = () => {
        if(webSocket.readyState === WebSocket.OPEN)
            webSocket.send(textSend); 
    }
    
    return (
        <>
            { contentList.result && contentList.result.title ? contentList.result.title.text : '' }
            <hr></hr>
            <input
                type="text" 
                onChange={(e) => setSendText(e.target.value)}
            />
            <br></br>
            <input type="submit" value="Enviar" onClick={() => sendMessage()} ></input>
            <br></br>
            <p>El sevidor dice: { textReceive }</p>
        </>
    )

}

export default Chat;