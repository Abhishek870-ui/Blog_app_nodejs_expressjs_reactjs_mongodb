import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
const Header = () => {
  const URL = window.location.pathname;
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(
    {
      "fname": localStorage.getItem("First_Name"),
      "lname": localStorage.getItem("Last_Name"),
      "image": localStorage.getItem("image")


    }
  )
  console.log(localStorage.length)

  const logoutuser = () => {
    localStorage.clear();
    setUserDetails("");
    navigate("/login")

  }


  console.log(userDetails, "userDetails")
  return (
    <>
      {userDetails === null ?
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">AG SOCIAL BLOG</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav mr-auto">
              {URL === "/register" ? <span>
                <NavLink
                  className="navbar-item"
                  to="/"
                  exact
                >
                  Home
                </NavLink>


                <NavLink
                  className="navbar-item"
                  to="/Login"
                  exact
                >
                  Login
                </NavLink> </span>
                :
                <span>{URL === "/Login"
                  ?
                  <span><NavLink
                    className="navbar-item"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                    {/* <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li> */}

                    <NavLink
                      className="navbar-item"
                      to="/register"
                      exact
                    >
                      Sign Up
                    </NavLink>
                    {/* <li className="nav-item">
              <a className="nav-link" href="#">SignUp</a>
            </li> */}

                  </span>
                  : <span><NavLink
                    className="navbar-item"
                    to="/"
                    exact
                  >
                    Home
                  </NavLink>
                    {/* <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li> */}

                    <NavLink
                      className="navbar-item"
                      to="/register"
                      exact
                    >
                      Sign Up
                    </NavLink>
                    {/* <li className="nav-item">
              <a className="nav-link" href="#">SignUp</a>
            </li> */}

                    <NavLink
                      className="navbar-item"
                      to="/Login"
                      exact
                    >
                      Login
                    </NavLink></span>}</span>}

              {/* <li className="nav-item">

              <a className="nav-link " href="#">Login</a>
            </li> */}
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        :
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">AG SOCIAL BLOG</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <form className="form-inline my-2 my-lg-0">
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <img src={userDetails.image} className="rounded-circle nav-link" width="50" height="40"></img>
                </li>
                <li class="nav-item">
                  <p className='text-white nav-link'>{userDetails.fname} {userDetails.lname}</p>
                </li>

                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Edit Image</a>
                    <button class="dropdown-item" onClick={() => logoutuser()} >Logout</button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </nav>


      }
    </>
  )
}

export default Header