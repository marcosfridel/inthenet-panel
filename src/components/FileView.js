const FileView = (p) => {
    
    //console.log('p.mimetype.toString().substring(0, 3)', p.mimetype.toString().substring(0, 3))

    const type = p.mimetype.split('/')[0]

    if(type === 'image') {
        let buffer = (new require('buffer').Buffer(p.binary, 'base64')).toString('base64');

        return (
            <>  
                <img alt="" src={`data:${p.mimetype};base64,${ buffer }`} />
            </>
        )

    }

    if(type === 'text') {
        let buffer = (new require('buffer').Buffer(p.binary, 'utf8')).toString('utf8');

        return (
            <>  
                { buffer }
            </>
        )
    }
        

}

export default FileView;