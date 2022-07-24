import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import { postApi } from '../lib/Api.js'

const File = () => {

    const [ fileList, setFileList ] = useState({})

    const getFileList = async () => {
        return await postApi(
            'file/list',
        )
    }

    useEffect(() => {
        getFileList()
            .then(result => {
                setFileList(result)
            })
            .catch(e => console.log(e))

    }, [])

    //console.log(fileList)

    if(fileList.result)
        return (
            <>
                {
                
                fileList.result.map((item) => 
                    <NavLink to={`/file/view/${item._id }`}>        
                        <p key={ item._id }> { `>>> ${ item.originalname } - ${ item.mimetype } - ${ item.size }` }</p>        
                        {/* <p key={ item.id } >{ item.OriginalName }</p> */}
                    </NavLink>
                    ) 
                }
            </>
        )
    
    return (
        <></>
    )
}

export default File