import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingBar from 'react-top-loading-bar';
import noteContext from '../context/Notes/noteContext';
import logo from '../logo.png';

const Navbar = () => {
  const context = useContext(noteContext);
  const { setAlertScreen, progress } = context;

  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  const onLogout = () => {
    localStorage.removeItem('token');
    setAlertScreen("LogOut Success", "success")
    history.push("/login");
  }


  return (
    <div>
      <LoadingBar
        color='#f11946'
        progress={progress}
        height={3}
      />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* Container wrapper */}
        <div className="container">
          {/* Navbar brand */}
          <Link className="navbar-brand me-2" to="/">
            <img className='logo' src={logo} height={16} alt="MDB Logo" loading="lazy" style={{ marginTop: '-1px' }} />

          </Link>
          {/* Toggle button */}
          <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarButtonsExample" aria-controls="navbarButtonsExample" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fas fa-bars" />
          </button>
          {/* Collapsible wrapper */}
          <div className="collapse navbar-collapse" id="navbarButtonsExample">
            {/* Left links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-1">
              <li className="nav-item mx-1 my-1">
                <Link className="btn btn-info" to="/about">About</Link>
              </li>
              <li className="nav-item mx-1 my-1">
                <Link className="btn btn-info" to="/routinePanel">Routine Panel</Link>
              </li>
              <li className="nav-item mx-1 my-1">
                <Link className="btn btn-info" to="/notes">Notes</Link>
              </li>
            </ul>
            {/* Left links */}
            <div className="d-flex align-items-center">

              {!localStorage.getItem("token") && <div>
                <Link type="button" className="btn btn-link px-3 me-2" to="/login">
                  Login
                </Link>
                <Link type="button" className="btn btn-primary me-3" to="/signup">
                  Sign up for free
                </Link>
              </div>}

              {localStorage.getItem("token") && <button type="button" className="btn btn-link px-3 me-2" onClick={onLogout}>
                Logout
              </button>}
              <a className="btn btn-dark px-3" href="https://github.com/piyush-hack" role="button"><i className="fab fa-github" /></a>
            </div>
          </div>
          {/* Collapsible wrapper */}
        </div>
        {/* Container wrapper */}
      </nav>


    </div>

  )
}

export default Navbar