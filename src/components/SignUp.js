import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import noteContext from '../context/Notes/noteContext';

const SignUp = () => {
    const context = useContext(noteContext);
    const { setAlertScreen , host , setProgress} = context;

    useEffect(() =>{
        async function pageloader(){
            await setProgress(100)
            setProgress(0)
        }
        pageloader()
      },[setProgress])

    const [credentials, setCredentials] = useState({ email: "", password: "" , name:"" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.confpassword !== credentials.password){
            setAlertScreen("Enter Same Password In Confirm Password Field", "danger");
            return;
        }
        setProgress(20)
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,  email: credentials.email, password: credentials.password })
        });
        setProgress(80)
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            setProgress(100)
            setAlertScreen("Sign Up Success", "success");
            history.push("/");
        }
        else {
            setAlertScreen("Invalid credentials", "danger");
        }
        setProgress(100)
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

  return (
      <div><section className="vh-100" style={{ backgroundColor: '#eee',     paddingTop: "20px" }}>
          <div className="container" >
              <div className="row d-flex justify-content-center align-items-center" style={{ height: "102% !important"}}>
                  <div className="col-lg-12 col-xl-11">
                      <div className="card text-black" style={{ borderRadius: 25 }}>
                          <div className="card-body p-md-5">
                              <div className="row justify-content-center">
                                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                          <div className="d-flex flex-row align-items-center mb-4">
                                              <i className="fas fa-user fa-lg me-3 fa-fw" />
                                              <div className="form-outline flex-fill mb-0">
                                                  <input type="text" id="form3Example1c" className="form-control lsInp" name="name" onChange={onChange} required/>
                                                  <label className="form-label lsLab" htmlFor="form3Example1c">Your Name</label>
                                              </div>
                                          </div>
                                          <div className="d-flex flex-row align-items-center mb-4">
                                              <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                                              <div className="form-outline flex-fill mb-0">
                                                  <input type="email" id="form3Example3c" className="form-control lsInp" onChange={onChange} name="email" required />
                                                  <label className="form-label lsLab" htmlFor="form3Example3c" >Your Email</label>
                                              </div>
                                          </div>
                                          <div className="d-flex flex-row align-items-center mb-4">
                                              <i className="fas fa-lock fa-lg me-3 fa-fw" />
                                              <div className="form-outline flex-fill mb-0">
                                                  <input type="password" id="form3Example4c" className="form-control lsInp" onChange={onChange} name="password" required />
                                                  <label className="form-label lsLab" htmlFor="form3Example4c" >Password</label>
                                              </div>
                                          </div>
                                          <div className="d-flex flex-row align-items-center mb-4">
                                              <i className="fas fa-key fa-lg me-3 fa-fw" />
                                              <div className="form-outline flex-fill mb-0">
                                                  <input type="password" id="form3Example4cd" className="form-control lsInp" onChange={onChange}  name="confpassword" required />
                                                  <label className="form-label lsLab" htmlFor="form3Example4cd">Repeat your password</label>
                                              </div>
                                          </div>
                                          <div className="form-check d-flex justify-content-center mb-5">
                                              <input className="form-check-input me-2 lsInp" type="checkbox" defaultValue id="form2Example3c" required />
                                              <label className="form-check-label lsLab" htmlFor="form2Example3">
                                                  I agree all statements in <a href="#!">Terms of service</a>
                                              </label>
                                          </div>
                                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                              <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                          </div>
                                      </form>
                                  </div>
                                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section></div>

  )
}

export default SignUp