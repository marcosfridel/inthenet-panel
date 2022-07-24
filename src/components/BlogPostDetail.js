const BlogPostDetail = (p) => {
    return (
        <>
            <h1>{ p.title }</h1>
            <hr></hr>
            <p>{ p.text }</p>
        </>
    )
}

export default BlogPostDetail;