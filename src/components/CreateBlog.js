import React, { useContext, useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import blogContext from '../context/Blogs/blogContext';
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import EditorToolbar, { modules } from "./QuillToolbar";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


const CreateBlog = () => {
  const context = useContext(blogContext);
  const { createState, setCreateState, addBlog, setAlertScreen, getBlogs , updateBlog } = context;
  let history = useHistory();
  let location = useLocation();
  const { id } = useParams();

  const editor1 = useRef(null);
  const editor2 = useRef(null);
  const quilledit = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleChange = (e) => {
    setCreateState({ ...createState, [e.target.name]: e.target.value })
  }

  const handleCreateBtn = (e) => {
    // e.target.disabled = true;
    if(location.pathname.slice(0 , 7) === "/update"){
      console.log("first")
      updateBlog(id);
      // quilledit.current.value = createState.body;
    }else{
      addBlog();
    }
  }

  const handleEditorChange = (e) => {
    setCreateState({
      ...createState, body: e
    })
  }

  const handleToogleClick = (e) => {
    if (editor2.current.style.display === "none") {
      editor1.current.style.display = "none"
      editor2.current.style.display = "block"
      setAlertScreen("Paste Is On ", "success")
      e.target.innerHTML = "Simple ← Advanced"
    } else {
      editor1.current.style.display = "block"
      editor2.current.style.display = "none"
      setAlertScreen("Paste Is Off ", "warning")
      e.target.innerHTML = "Simple → Advanced"
    }
  }


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login")
    } else {
      if(location.pathname.slice(0 , 7) === "/update"){
        console.log("first")
        getBlogs(id , "update");
        // quilledit.current.value = createState.body;
      }else{
        setCreateState({
          ...createState, body: draftToHtml(convertToRaw(editorState.getCurrentContent())).replace(/<img[^>]*>/g, "")
        })
      }
      

      
    }
  }, [editorState , location]);
  return (
    <div>
      <br /><br /><br />
      <div style={{ borderBottom: "2px solid Black", padding: '2px', minHeight: '400px' }} className="container">
        <input type="text" id="edittitle" className="form-control" onChange={handleChange} name="title" placeholder="Title Here" />
        <br />
        <input type="text" id="editsubtitle" className="form-control" onChange={handleChange} name="subtitle" placeholder="SubTitle Here" />
        <br />
        <button type="button" id="toogleEditor" className="btn btn-outline-dark" onClick={handleToogleClick}>Simple ← Advanced</button>
        <div ref={editor1} style={{ display: "none", position: "relative" }} >
          <Editor ref={editor1}
            editorState={editorState}
            onEditorStateChange={setEditorState}

          />
        </div>
        <div ref={editor2} style={{ display: "block", position: "relative" }} value="" >

          <EditorToolbar />

          <ReactQuill
           ref={quilledit}
            theme="snow"
            onChange={handleEditorChange}
            placeholder={"Write something awesome..."}
            modules={modules}
          >
            </ReactQuill>
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleCreateBtn}>Save</button>
        <br /><br /><br />

      </div>


    </div>
  );

}

export default CreateBlog
