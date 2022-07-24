/* const api = async (p) => { */
    const host = 'http://localhost:8080/'

    const getOption = (method, token, uploadFile) => {
        if(uploadFile)
            return  {
                method: method,
                headers: { 
                    "Authorization" : `Bearer ${token}`
                }
            };  

        return {
            method: method,
            headers: { 
                'Content-Type': 'application/json', 
                "Authorization" : `Bearer ${token}`
            }
        };        
    }

    const getUrl = (url) => {
        url = undefined ? 'auth' : url;

        if (url.substring(0, 3) === 'http') return url;
        
        return `${host}${url}`
    }
   
    export const uploadFileApi = async (e, callback, url, field, files, params) => {
        e.preventDefault()
        
        if(!files) return { type: 'error' };

        let formData = new FormData()        

        for (let i = 0; i < files.length; i++) 
            formData.append(field, files[i]);

        if(params) {
            Object.keys(params).map(key => {
                formData.append(key, params[key])
            })
        }

        const token = JSON.parse(localStorage.getItem('token'));
        const options = getOption("POST", token, true)

        options["method"] = "post";
        if(formData)
            options["body"] = formData;
        
        options['credentials'] = "same-origin";

        url = getUrl(url);

        return await fetch(url, options)
            .then(response => response.json())
            .then(data => callback(data))
    }

    export const getApi = async (url, params, callbackResolve, callbackReject) => {
        const token = JSON.parse(localStorage.getItem('token'));

        return await requestFetch(
            {
                method: 'get',
                url: `${url}${params ? `/${params}` : "" }`
            },
            token,
            callbackResolve,
            callbackReject
        )    
    }

    export const postApi = async (url, params, callbackResolve, callbackReject) => {
        const token = JSON.parse(localStorage.getItem('token'));

        return await requestFetch(
            {
                method: 'post',
                url: `${url}`,
                params: params
            },
            token,
            callbackResolve,
            callbackReject
        )
    }

    const requestFetch = async (p, token, callbackResolve, callbackReject) => {
        const method = (p.method === undefined ? 'post' : p.method)

        const url = getUrl(p.url);

        const options = getOption(method, token)
        
        if (p.params) {
            if(method !== 'get') {
                options['body'] = JSON.stringify(p.params);
            }
        }
        options['credentials'] = "same-origin";

        return await fetch(url, options)
            .then(response => 
                response.json()
            )
    }
    
/* } */

/* exports.module = {
    get
}
 */