
import { createContext } from 'react';
import { getApi, postApi } from '../lib/Api'

export const ContentContext = createContext();

const ContentContextProvider = ({children}) => {

    const getAuthStatus = async () => {
        console.log('getAuthStatus')
        return await getApi(
            'auth/status'
        )
    }

    const getListByLenguage = async (keys, lang) => {
        const langList = [ 'sp', 'en' ]

        //console.log('langList.filter(item => item === lang)', langList.filter(item => item === lang))
        if(lang && langList.filter(item => item === lang).length === 0)
            return null;

        const langLocal = 
            JSON.parse(localStorage.getItem('lang')) === null ? 
            'sp' : 
            JSON.parse(localStorage.getItem('lang'));

        lang = (lang !== undefined ? lang : langLocal)
        //console.log('lang', lang, 'langLocal', langLocal)
        if(lang !== langLocal)
            localStorage.setItem('lang', JSON.stringify(lang));

        //console.log(lang);

        //console.log('lang', lang)
        let params = {
            "translate.language": lang
        }
    
        if(keys)
            params["key"] = {"$in" : keys}
    
        //console.log('getListByLenguage - params', params);
    
        return await postApi(
            'content/listByLanguage',
            params
            )
        //return JSON.parse(result)
    }
    
    return (
        <ContentContext.Provider value={ { getListByLenguage, getAuthStatus } }> { }
            {children}
        </ContentContext.Provider>
    )
}

export default ContentContextProvider;