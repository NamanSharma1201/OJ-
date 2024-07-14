import React from 'react'
import Comments from '../components/Comments'
import BlogContent from '../components/BlogContent'
import { useParams } from 'react-router-dom'

const ReadBlog = () => {
    const { id } = useParams();

    return (
        <div>
            <BlogContent id={id} />
            <Comments id={id} />
        </div>
    )
}

export default ReadBlog
