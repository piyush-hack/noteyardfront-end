import React, { useContext, useState } from "react";
import BlogContext from "./blogContext";
import noteContext from "../Notes/noteContext";
import $ from 'jquery';

const BlogState = (props) => {

    const context = useContext(noteContext);
    const { host, setProgress, setAlertScreen } = context;
    const [createState, setCreateState] = useState(null)
    const [ckState, setCkState] = useState("")

    let blogsIntial = [
        {
            "_id": "000000000000",
            "user": "000000000000",
            "title": " ",
            "subtitle": " ",
            "body": " ",
            "like": [],
            "tags": [],
            "date": new Date(),
            "__v": 0
        },
    ];

    const [allArticles, setAllArticles] = useState({
        articles: blogsIntial,
        loading: false,
        page: 1,
        totalResults: 0,
        pageSize: 6,
    })


    // const [blogs, setBlogs] = useState(blogsIntial)

    function blogs() {
        return allArticles.articles
    }

    async function setBlogs(newArticles, concat = false) {

        console.log(newArticles, "fdsf")
        await setAllArticles({
            ...allArticles,
            articles: concat === false ? newArticles : allArticles.articles.concat(newArticles),
        })
        await console.log(allArticles.articles)
    }

    const [blogPost, setBlogPost] = useState(blogsIntial[0])

    $(".public-DraftEditor-content").on('paste', function (e) {
        e.preventDefault();
        setAlertScreen("Paste Is Not Allowed In This Editor", "warning");
        return false;
    });

    $(window).scroll(function (e) {
        var $el = $('.ql-toolbar');
        var isPositionFixed = ($el.css('position') === 'fixed');
        if ($(this).scrollTop() > 300 && !isPositionFixed) {
            $el.css({ 'position': 'fixed', 'top': '0px' });
        }
        if ($(this).scrollTop() < 300 && isPositionFixed) {
            $el.css({ 'position': 'static', 'top': '0px' });
        }
    });

    const getBlogsByPage = async (page, concat) => {
        setBlogPost(blogsIntial[0])
        await callAPI("GET", `${host}/api/blogs/fetchallblogs/undefined?page=${page}&limit=${allArticles.pageSize}`)
            .then(async data => {
                if (data && data.articles && data.articles.length > 0 && !data.error) {
                    // console.log(page)

                    // await setBlogs(data, true);
                    await setAllArticles({
                        ...allArticles,
                        articles: concat === false ? data.articles : allArticles.articles.concat(data.articles),
                        totalResults: data.totalResults,
                        totalPages: Math.ceil(allArticles.totalResults / allArticles.pageSize),
                        loading: false,
                        page: concat === false? 2 : allArticles.page + 1
                    })
                    await setAlertScreen("DATA RETRIVED", "success")
                    // console.log(data)
                } else {
                    // setBlogs(null)
                    // console.log(data , data.length)
                }
                setProgress(100)
                // console.log(data); // JSON data parsed by `data.json()` call

            });
    }


    const getBlogs = async (id, refer) => {
        setBlogPost(blogsIntial[0])
        await callAPI("GET", `${host}/api/blogs/fetchallblogs/${id}`)
            .then(async data => {
                if (data && data.articles && data.articles.length > 0 && !data.error) {
                    if (id) {
                        setBlogPost(data.articles[0])
                        if (refer === "update") {
                            $("#edittitle").val(data.articles[0].title);
                            $("#editsubtitle").val(data.articles[0].subtitle)
                            $(".ql-editor").html(data.articles[0].body);
                            setProgress(100)

                            setCreateState({
                                ...createState, date: data.articles[0].date, body: data.articles[0].body,
                                title: data.articles[0].title
                            });
                            setCkState(data.articles[0].body);
                        }
                    } else {
                        await setBlogs(data.articles);
                    }
                    await setAlertScreen("DATA RETRIVED", "success")
                    // console.log(data)
                } else {
                    console.log("Error", data)
                }
                setProgress(100)
                // console.log(data); // JSON data parsed by `data.json()` call

            });
    }
    // http://localhost:5000/api/blogs/updateblog/622302da2a549bcdf708ac5b

    const addBlog = async () => {
        //console.log("adding a note", note)

        if (!createState || createState.body.length < 100 || (!createState.title || createState.title.length <= 0)
            || !createState.subtitle || createState.subtitle.length <= 0) {
            setAlertScreen("Fill All The Fields. And Content Should Be More Than 100 Words ", "danger");
            return;
        }
        await callAPI("POST", `${host}/api/blogs/addblog`, createState)
            .then(data => {
                if (!data.errors) {
                    setAlertScreen("Addedd Successfully", "success");
                    window.location.href = "/blog"
                } else {
                    console.log(data);

                    let error = typeof data.errors === "string" ? data.errors : data.errors.map((error) => {
                        return error.msg + " "
                    })
                    setAlertScreen("REQUEST FAILED. " + error, "danger")
                }
                setProgress(100)

            });


    }
    const updateBlog = async (id) => {
        //console.log("adding a note", note)

        if (!createState || createState.body.length < 100 || !createState.title || createState.title.length <= 0) {
            setAlertScreen("Fill All The Fields. And Content Should Be More Than 100 Words ", "danger");
            return;
        }
        await callAPI("PUT", `${host}/api/blogs/updateblog/${id}`, createState)
            .then(data => {
                if (!data.errors) {
                    setAlertScreen("Updated Successfully", "success");
                    window.location.href = "/blogpost/" + id;
                } else {
                    console.log(data);

                    let error = typeof data.errors === "string" ? data.errors : data.errors.map((error) => {
                        return error.msg + " "
                    })
                    setAlertScreen("REQUEST FAILED. " + error, "danger")
                }
                setProgress(100)

            });


    }

    async function callAPI(method = 'POST', url = '', data = {}) {
        // Default options are marked with *
        // console.log(localStorage.getItem('token'))
        setProgress(30)
        try {
            if (method !== "GET") {
                const response = await fetch(url, {
                    method: method, // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token') || null,
                    },
                    body: JSON.stringify(data)
                });
                setProgress(80)
                if (!response.ok) {
                    console.log(response)
                    setProgress(100)
                    setAlertScreen("REQUEST FAILED. " + response.statusText + ". Check console for more", "danger");
                    return;
                }
                return response.json();
            } else {
                const response = await fetch(url, {
                    method: method, // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token') || null,
                    }
                });
                setProgress(80)
                return response.json();
            }
        } catch (error) {
            console.log(error)
            setAlertScreen("REQUEST FAILED. Check console for more", "danger")
        }


    }

    return (
        <BlogContext.Provider value={{ blogs, getBlogs, blogPost, setBlogPost, createState, setCreateState, addBlog, setAlertScreen, updateBlog, ckState, setCkState, allArticles, setAllArticles, getBlogsByPage }}>
            {props.children}
        </BlogContext.Provider>
    )
}

export default BlogState