import React, { useContext, useEffect, useRef } from "react";
import blogContext from '../context/Blogs/blogContext';
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import EditorToolbar, { modules } from "./QuillToolbar";
import { Editor as ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import parse from 'html-react-parser';


const CreateBlog = () => {
  const context = useContext(blogContext);
  const { createState, setCreateState, addBlog, setAlertScreen, getBlogs, updateBlog, ckState } = context;
  let history = useHistory();
  let location = useLocation();
  const { id } = useParams();
  const editor1 = useRef(null);
  const editor2 = useRef(null);
  const quilledit = useRef(null);
  const handleChange = (e) => {
    setCreateState({ ...createState, [e.target.name]: e.target.value })
  }

  const handleCreateBtn = (e) => {
    if (location.pathname.slice(0, 7) === "/update") {
      // console.log("first")
      updateBlog(id);
    } else {
      addBlog();
    }
  }

  const handleEditorChange = (e) => {

    // var dateOne = new Date(createState.date); //Year, Month, Date    
    // var dateTwo = new Date('January 18, 2022'); //Year, Month, Date   
    // if (dateCheck === false) {
    //   if (dateOne > dateTwo) {
    //     dateCheck = true;
    //     setAlertScreen("Filled Both Editors", "success")

    //   } else {
    //     setAlertScreen("Advanced Editor's Update Available From 18 Mar 2022", "warning")
    //   }
    // }


    setCreateState({
      ...createState, body: e, lastChange: "ReactQuill-Editor"
    })
  }

  const handleToogleClick = (e) => {
    if (editor2.current.style.display === "none") {
      editor1.current.style.display = "none"
      editor2.current.style.display = "block"
      setAlertScreen("Changed To Simple", "success")
      e.target.innerHTML = "Simple → Advanced"

    } else {
      editor1.current.style.display = "block"
      editor2.current.style.display = "none"

      setAlertScreen("Formatting of Simple Editor May Not Reflect In Advanced Editor", "warning")
      e.target.innerHTML = "Simple ← Advanced"
      // e.target.disabled = true;
    }
  }


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login")
    } else {
      if (location.pathname.slice(0, 7) === "/update") {
        async function getData() {
          await getBlogs(id, "update")
        }
        getData()
      } else {

      }
    }
  }, [location]);
  return (
    <div>
      <br /><br /><br />
      <div style={{ borderBottom: "2px solid Black", padding: '2px', minHeight: '400px' }} className="container">
        <input type="text" id="edittitle" className="form-control" onChange={handleChange} name="title" placeholder="Title Here" />
        <br />
        <input type="text" id="editsubtitle" className="form-control" onChange={handleChange} name="subtitle" placeholder="SubTitle Here" />
        <br />
        <button type="button" id="toogleEditor" className="btn btn-outline-dark" onClick={handleToogleClick}>Simple → Advanced</button>
        <div ref={editor1} style={{ display: "none", position: "relative" }} >
          <CKEditor
            editor={ClassicEditor}
            data={ckState}
            onReady={editor => {
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setCreateState({
                ...createState, body: data, lastChange: "ck-editor"
              })
            }}
            onBlur={(event, editor) => {
              console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
              console.log('Focus.', editor);
            }}
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
        <div>
          <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
            Save Changes
          </button>
          <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-top">
              <div className="modal-content">
                <div className="modal-body position-relative min-vh-100">
                  <div className="justify-content-center align-items-center my-3">
                    <h4>
                      <span className="badge bg-danger mx-2 position-fixed top-0 my-2 btn-sm ms-2">
                        {!createState && "Add Something In Editor"}
                        {createState && !createState.lastChange && "No Changes Yet"}
                        {createState && createState.lastChange && "Last Change In " + createState.lastChange}
                        <br /><br />
                        {createState && createState.lastChange && "Content Of " + createState.lastChange + " will be Saved"}

                      </span>
                    </h4>
                    <div className="blogitem " >
                      <h2>{createState && createState.title}</h2>
                      <p className='date'>{createState && createState.date && (new Date(createState.date)).toDateString()}</p>
                      <div className="body">
                        {createState && createState.body && parse(createState.body)}
                      </div>
                    </div>
                    <div className={createState && createState.lastChange && "position-fixed bottom-0 my-2"}>
                      <button className="btn btn-primary  btn-sm ms-2" onClick={handleCreateBtn}>Save</button>

                      <button type="button" className="btn btn-info btn-sm ms-2" data-mdb-dismiss="modal">
                        No, thanks
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <button className="btn btn-primary" onClick={handleCreateBtn}>Save</button> */}
        <br /><br /><br />

      </div>
    </div>
  );

}

export default CreateBlog
