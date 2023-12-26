import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

function Navbar(props) {
 
  const {user,logout} = useContext(AuthContext)

  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white" aria-label="Fourth navbar example">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#"><img src={logo} alt="todo" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {
                !user?
                <>
                 <li className="nav-item">
                      <Link className="nav-link " aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link " aria-current="page" to="/validation">Validation</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">about</Link>
                    </li>
                  </>:
                  <>
                  {/* <li className="nav-item">
                      <Link className="nav-link " aria-current="page" to="/">Home</Link>
                    </li> */}
                    {/* <li className="nav-item">
                      <Link className="nav-link" to="/about">About</Link>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/task-list">task-list</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/createtask">CreateTask</Link>
                    </li>

                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="#" data-bs-toggle="dropdown" aria-expanded="false">{user?.name}</Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Action</Link></li>
                        <li><Link className="dropdown-item" to="UpdateProfile">Another action</Link></li>
                        <li><Link className="dropdown-item" to="/" onClick={logout}>logout</Link></li>
                      </ul>
                    </li>
                  </>
              

              }
            </ul>
            <form role="search">
              <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
            </form>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Navbar;