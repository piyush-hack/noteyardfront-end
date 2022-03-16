import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import noteContext from '../context/Notes/noteContext';


const Login = (props) => {
    const context = useContext(noteContext);
    const { setAlertScreen , host , setProgress } = context;
    
    useEffect(() =>{
        async function pageloader(){
            await setProgress(100)
            setProgress(0)
        }
        pageloader()
      },[setProgress])

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProgress(20)
        const response = await fetch(`${host}/api/auth/login` , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        setProgress(80)
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            setAlertScreen("Login Success", "success");
            setProgress(90)
            setTimeout(() => {
                setProgress(100)
                history.push("/");
            }, 1000);
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
        <div>
            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <input type="email" className="form-control lsInp" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    <label className="form-label lsLab" htmlFor="email">Email address</label>
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <input type="password" className="form-control lsInp" value={credentials.password} onChange={onChange} name="password" id="password" required />
                                    <label className="form-label lsLab" htmlFor="form1Example23">Password</label>
                                </div>
                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    {/* Checkbox */}
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultValue id="form1Example3" defaultChecked />
                                        <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                                    </div>
                                    {/* <a href="#!">Forgot password?</a> */}
                                </div>
                                {/* Submit button */}
                                <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Login