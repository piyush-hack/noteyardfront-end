import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import blogContext from "../context/Blogs/blogContext";
import parse from "html-react-parser";
import noteContext from "../context/Notes/noteContext";

const BlogItem = () => {
    const context = useContext(blogContext);
    const notecontext = useContext(noteContext);
    const { blogPost, getBlogs } = context;
    const { addDesc } = notecontext;
    var loc = window.location.href.split("/");

    // document.title = blogPost.title;
    // document.getElementsByTagName("META")[2].content = blogPost.subtitle;

    const { id } = useParams();

    const getBody = () => {
        try {
            return parse(blogPost.body);
        } catch (error) {
            return blogPost.body;
        }
    };

    const addToNote = () => {
        var selection = window.getSelection();
        let range = selection.getRangeAt(0);
        var clonedSelection = range.cloneContents();
        var div = document.createElement('div');
        div.appendChild(clonedSelection);
        // console.log(window.getSelection().toString() , div.innerHTML)

        addDesc({description : div.innerHTML})
    }

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        // if (document.querySelector(".body").innerHTML.trim() === "") {
        async function start() {
            await getBlogs(id);
            const p = document.querySelector("body");

            p.addEventListener('mouseup', (e) => {

                const selection = window.getSelection().toString();

                if (selection === '') {
                    // console.log('click');
                    document.querySelector(".onSelDiv") && document.querySelector(".onSelDiv").classList.add("removeSelDiv");
                } else {
                    let ele = document.querySelector(".onSelDiv");
                    document.querySelector(".onSelDiv") && document.querySelector(".onSelDiv").classList.remove("removeSelDiv");
                    var r = window.getSelection().getRangeAt(0).getBoundingClientRect();
                    var relative = document.body.parentNode.getBoundingClientRect();
                    ele.style.top = (r.bottom - relative.top + 10) + 'px';//this will place ele below the selection
                    ele.style.right = -(r.right - relative.right) + 'px';
                }

            });

            let codes = document.getElementsByTagName("pre");
            for (let i = 0; i < codes.length; i++) {
                let btn = document.createElement("button");
                btn.innerHTML = "Copy";
                btn.setAttribute("class", "btn btn-sm btn-sm btn-outline-dark btn-rounded copyBtn");
                btn.setAttribute("data-mdb-ripple-color", "dark");

                btn.onclick = function () {
                    navigator.clipboard.writeText(
                        document.getElementsByTagName("pre")[i].childNodes[0].innerText
                    );
                    btn.innerHTML = "Copied";
                    setTimeout(() => {
                        btn.innerHTML = "Copy";
                    }, 3000);
                };
                document.getElementsByTagName("pre")[i].appendChild(btn);
                // document.getElementsByTagName("pre")[i].style.color = "green";
            }
        }
        start();
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="blogitem">
            <div className="navbar navbar-dark bg-dark onSelDiv removeSelDiv px-3 ">
                <button className="btn btn-sm btn-outline-light mx-1" onClick={addToNote} ><i className="fas fa-pen"></i></button>
                <button className="btn btn-sm  mx-1 shareBtn" onClick={() => {
                    if (navigator.share) {
                        navigator.share({
                            title: document.title,
                            text: window.getSelection().toString(),
                            url: window.location.href
                        })
                            .then(() => console.log('Successful share'))
                            .catch(error => console.log('Error sharing:', error));
                    }
                }} ><i className="fas fa-share-alt"></i></button>
            </div>
            <h2>{blogPost.title}</h2>
            <p className="date">{new Date(blogPost.date).toDateString()}</p>
            <div className="body">{getBody()}</div>
            <div>
                <div>
                    <div
                        className="fb-comments"
                        data-href={"https://noteyard.piyushdev.xyz/blogpost/" + loc[4]}
                        data-width="100%"
                        data-numposts="1"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default BlogItem;
