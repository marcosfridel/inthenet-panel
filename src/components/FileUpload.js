import { useState } from "react"

import { uploadFileApi } from '../lib/Api'

const FileUpload = () => {

    const [ file, setFile ] = useState()
    const [ files, setFiles ] = useState()

    const [ collection, setCollection ] = useState('');
   
    const onUpload = (data) => {
        console.log(data);
    }
  
    return (
        <>
            <div>
                <h1>Upload Simple</h1>
                <form onSubmit={ (e) => uploadFileApi(e, onUpload, 'file/upload', 'file', file) }>
                    <input type='file' name='file' onChange={ (e) => setFile(e.target.files) }></input>
                    <button type='submit'>Upload</button>
                </form>
                <h1>Upload Multiple</h1>
                <form onSubmit={ (e) => uploadFileApi(e, onUpload, 'file/uploadmultiple', 'files', files) }>
                    <input type='file' name='files' onChange={ (e) => setFiles(e.target.files) } multiple ></input>
                    <button type='submit'>Upload All</button>
                </form>
                <h1>Import </h1>
                <form onSubmit={ (e) => uploadFileApi(e, onUpload, 'file/import', 'fileimport', file, 
                        { 
                            "collection": collection 
                        }
                    ) }>
                    <input type='file' name='fileimport' onChange={ (e) => setFile(e.target.files) }></input>
                    <input type='text' name='collection' onChange={ (e) => setCollection(e.target.value) } value={ collection } ></input>
                    <button type='submit'>Importart</button>
                </form>
            </div>

{/*             <form action="http://localhost:8080/file/upload" enctype="multipart/form-data" method="POST"> 
                <input type="file" name="file" />
                <input type="submit" value="Upload"/>
            </form>

            <h1>Upload to server</h1>
            {image.preview && <img src={image.preview} width='100' height='100' />}  */}           
        </>
    )
}

export default FileUpload;