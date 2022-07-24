import { NavLink } from 'react-router-dom';

const BlogPostItem = (item) => {
    return (
        <>
            <NavLink to={`/blog/post/${item.id}`}   >  
                <p key={ item.id }> { `>>> ${ item.title } - ${ item.text }` }</p>
            </NavLink>
        </>
    )
}

export default BlogPostItem;