import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import blogContext from '../context/Blogs/blogContext';
import parse from 'html-react-parser';

const BlogItem = () => {

    const context = useContext(blogContext);
    const { blogPost, getBlogs } = context;
    var loc = window.location.href.split("/");

    // document.title = blogPost.title;
    // document.getElementsByTagName("META")[2].content = blogPost.subtitle;

    const { id } = useParams();


    const getBody = () => {
        try {
            return parse(blogPost.body)
        } catch (error) {
            return blogPost.body
        }
    }



    useEffect(() => {

        if (window.FB) {
            window.FB.XFBML.parse();
        }

        async function start() {
            await getBlogs(id);
        }

        start();

            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='blogitem'>
            <h2>{blogPost.title}</h2>
            <p className='date'>{(new Date(blogPost.date)).toDateString()}</p>
            <div className="body">
                {getBody()}
            </div>
            <div>
                <div>
                    <div
                        className="fb-comments"
                        data-href={"https://noteyard.piyushdev.xyz/blogpost/" + loc[4]}
                        data-width="100%" data-numposts="1"></div>

                </div>
            </div>
        </div>
    )
}

export default BlogItem