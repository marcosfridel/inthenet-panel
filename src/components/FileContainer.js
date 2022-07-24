import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApi } from '../lib/Api.js'

import FileView from './FileView'

//import { Buffer } from 'buffer'

const FileContainer = () => {

    const { idFile } = useParams();

    const [ file, setFile] = useState({})

    const getFile = async () => {
        return await getApi(
            'file/get',
            idFile
        )
    }

    useEffect(() => {
        getFile()
            .then(result => {
                setFile(result)
            })
            .catch(e => console.log(e))

    }, [])


    if(file.result) {

/*         console.log(file.result.binary)
        console.log(file.result.binary.data)
        console.log(btoa(file.result.binary.data))
 */
        //const buffer1 = Buffer.from(file.result.binary.data, 'base64')
        //const buffer = btoa(file.result.binary.data) 
        
        //const buffer = null//Buffer.from(file.result.binary.data, 'utf-8').toString('base64')

        //const buffer = btoa(String.fromCharCode(...new Uint8Array(file.result.binary.data)));
        //console.log(file.result.binary.data)
        

        return (
            <>
                <FileView
                    key= { file.result._id }
                    mimetype= { file.result.mimetype }
                    binary= { file.result.binary.data }
                ></FileView>
            </>
        )

    }

    return (
        <>
        </>
    )
}

export default FileContainer