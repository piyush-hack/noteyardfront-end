import React, { useContext, useEffect } from 'react'
import noteContext from '../context/Notes/noteContext';


export const About = () => {
  const context = useContext(noteContext);
  const { setProgress } = context;
  useEffect(() =>{
    async function pageloader(){
        await setProgress(100)
        setProgress(0)
    }
    pageloader()
  },[setProgress])

  return (
    <div>{/* Section: Features v.3 */}
      <section className="my-5">
        {/* Section heading */}
        <h2 className="h1-responsive font-weight-bold text-center my-5">Why is it so great?</h2>
        {/* Section description */}
        <p className="lead grey-text text-center w-responsive mx-auto mb-5">Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam.</p>
        {/* Grid row */}
        <div className="row">
          {/* Grid column */}
          <div className="col-lg-5 text-center text-lg-left">
            <img className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/screens-section.webp" alt="Sample" />
          </div>
          {/* Grid column */}
          {/* Grid column */}
          <div className="col-lg-7">
            {/* Grid row */}
            <div className="row mb-3">
              {/* Grid column */}
              <div className="col-1">
                <i className="fas fa-share fa-lg indigo-text" />
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-xl-10 col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Safety</h5>
                <p className="grey-text">We promise that your data is highly secured and will not share it to anyone under any condition</p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
            {/* Grid row */}
            <div className="row mb-3">
              {/* Grid column */}
              <div className="col-1">
                <i className="fas fa-share fa-lg indigo-text" />
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-xl-10 col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Technology</h5>
                <p className="grey-text">Have Used nodejs And react mainly to create noteyard project . As for databse we have used mongodb.</p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
            {/*Grid row*/}
            <div className="row">
              {/* Grid column */}
              <div className="col-1">
                <i className="fas fa-share fa-lg indigo-text" />
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-xl-10 col-md-11 col-10">
                <h5 className="font-weight-bold mb-3">Contact</h5>
                <p className="grey-text mb-0">You can contact us and contribute to this project on github</p>
              </div>
              {/* Grid column */}
            </div>
            {/*Grid row*/}
          </div>
          {/*Grid column*/}
        </div>
        {/* Grid row */}
      </section>
      {/* Section: Features v.3 */}</div>


  )
}
