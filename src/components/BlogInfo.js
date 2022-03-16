import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const BlogInfo = (props) => {


    const { blog } = props;
    const history = useHistory();

    const handleClick = () => {
        history.push({
            pathname: `/blogpost/${blog._id}`
        })
    }


    return (
        <div className='bloginfo' onClick={handleClick}>
            <h3 className="">{blog.title}</h3>
            <p >{blog.subtitle}
                <br />
                <span >Learn more.</span>
            </p>
        </div>
    )
}

export default BlogInfo