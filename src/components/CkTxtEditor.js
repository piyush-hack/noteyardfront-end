import React, { useContext } from 'react'
import { Editor as ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import blogContext from '../context/Blogs/blogContext';
import ImageHoster from './ImageHoster';

const CkTxtEditor = () => {
    const context = useContext(blogContext);
    const { createState, setCreateState, ckState } = context;

    function doEditor(editor) {
        console.log(editor)
        const editorBtn = document.createElement('button');
        editorBtn.innerHTML = '📁'
        // editorBtn.setAttribute('class' , 'btn btn-primary');
        editorBtn.setAttribute("data-mdb-toggle", "modal")
        editorBtn.setAttribute("data-mdb-target", "#exampleModal2")
        editorBtn.setAttribute('aria-pressed', 'false');
        const editor_toolbar = document.querySelector('.ck-toolbar');
        editor_toolbar.appendChild(editorBtn);
    }

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={ckState}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    // console.log('Editor is ready to use!', editor);
                    doEditor(editor);
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

            {/* ///////////////////////////// */}

            <div className="modal fade " id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-top">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="my-3 mx-3">
                                <span className="badge bg-dark mx-2 position-fixed top-0 my-2 btn-sm ms-2">
                                    Upload Image And Copy Link
                                </span>
                                <div></div>
                                <ImageHoster />
                                <button type="button" className="btn btn-info btn-sm ms-2" data-mdb-dismiss="modal">
                                    No, thanks
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* //////////////////////////// */}
        </div>
    )
}

export default CkTxtEditor
