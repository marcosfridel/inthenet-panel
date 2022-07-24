import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './components/Index'
import NavBar from './components/Navbar'
import Footer from './components/Footer'

import Blog from './components/Blog'
import BlogPostContainer from './components/BlogPostContainer'

import Login from './components/Login'
import Auth from './components/Auth'

import Chat from './components/Chat'
import File from './components/File'
import FileUpload from './components/FileUpload'

import ContentContextProvider from './context/Content';
import FileContainer from './components/FileContainer';

const App = () => {

  return (
        <>
            <ContentContextProvider>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        {/* <Route path="/" element={<Index></Index>}></Route> */}
                        <Route path="/?:lang" element={<Index></Index>}></Route>
                        <Route path="/auth/:token" element={<Auth></Auth>}></Route>
                        {/* <Route path="/auth/?:token" element={<Auth></Auth>}></Route> */}
                        <Route path="/login" element={<Login></Login>}></Route>
                        <Route path="/blog" element={<Blog></Blog>}></Route>
                        <Route path="/blog/post/:idPost" element={<BlogPostContainer></BlogPostContainer>}></Route>
                        <Route path="/chat" element={<Chat></Chat>}></Route>
                        <Route path="/file" element={<File></File>}></Route>
                        <Route path="/file/upload" element={<FileUpload></FileUpload>}></Route>
                        <Route path="/file/view/:idFile" element={<FileContainer></FileContainer>}></Route>
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </ContentContextProvider> 

        </>
    );
}

export default App;
