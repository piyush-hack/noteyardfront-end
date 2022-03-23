import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogContext from '../context/Blogs/blogContext'
import AnimatedBg from './AnimatedBg'
import BlogInfo from './BlogInfo'
import Footer from './Footer'
import MainBox from './MainBox'
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from './Spinner'

const BlogHome = () => {

    const context = useContext(blogContext);
    const { allArticles, setAllArticles, getBlogsByPage } = context;


    const fetchMoreData = async () => {
        console.log(allArticles.page)

        if (allArticles.page > 1) {
            await getBlogsByPage(allArticles.page, true);
        }
    };

    useEffect(() => {



        async function start() {
            await getBlogsByPage(1, false);
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
                <InfiniteScroll
                    dataLength={allArticles.articles.length}
                    next={fetchMoreData}
                    hasMore={allArticles.articles.length !== allArticles.totalResults}
                    loader={<Spinner show={allArticles.page === 1 ? allArticles.loading : true} spinClass={allArticles.page === 1 ? "spinner" : "spinnerMore"} />}
                >
                    <div className='a1'>
                        {allArticles.articles && allArticles.articles.map((blog, i) => {
                            return blog ? <BlogInfo key={blog._id} blog={blog} /> : null;
                        })}

                    </div>
                </InfiniteScroll>
            </div>
            <br /><br />
            <Footer />

        </div >
    )
}

export default BlogHome