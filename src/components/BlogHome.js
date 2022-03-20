import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogContext from '../context/Blogs/blogContext'
import AnimatedBg from './AnimatedBg'
import BlogInfo from './BlogInfo'
import Footer from './Footer'
import MainBox from './MainBox'
const BlogHome = () => {

    const context = useContext(blogContext);
    const { blogs, getBlogs } = context;

    useEffect(() => {

        async function start() {
            await getBlogs();
        }
        start();
    }, [])

    return (
        <div className='bloghome'>
            <AnimatedBg />
            <div className="background">
                <div className='bgtxt'>
                    <h1>NoteYard</h1>
                    <p>
                        View Our Latest Blog Here . We provide features for making our notes and creating daily routine panel for free . Also Read Our Educational Blogs For Free Here</p>
                    <button className="btn btn-primary" >
                        <Link to="/routinepanel" style={{ color: "white" }}> View Routine Panel </Link>
                    </button>
                </div>
            </div>

            <MainBox />
            <div className='sectionA'>
                <h2>Need More ?</h2>
                <br />
                <a href="https://www.youtube.com/channel/UCHX9Sck5gX34F9nDkB0rXww">
                    <button type="button" className="btn btn-outline-danger slbtn" data-mdb-ripple-color="dark"> ▷ You Tube <span></span></button> </a>

                <br /><br />

                <div className='a1'>
                    {blogs && blogs.map((blog, i) => {
                        return blog ? <BlogInfo key={blog._id} blog={blog} /> : null;
                    })}

                </div>
            </div>
            <br /><br />
            <Footer />

        </div >
    )
}

export default BlogHome