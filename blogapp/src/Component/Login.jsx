import React, { useEffect, useState } from 'react'
import Header from './Header'
import registerlogo from './Image/wallpaperflare.com_wallpaper.jpg'
import Axios from 'axios'
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import Footer from './Footer';
import { Alert, message } from 'antd';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [errormessage, setErrormessage] = useState({
    email: '',
    password: '',
  })

  let { email, password } = data;

  const navigate = useNavigate();

  // this function is used to validate the input fields

  const validateForm = () => {
    let error = false;


    if (email === '') {
      error = {
        field_id: "email",
        message: "Email is required"
      }
      return error;
    }
    const emailcond = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (emailcond.test(email) === false) {
      error = {
        field_id: "email",
        message: "Email is not correct"
      }
      return error;
    }



    if (password === '') {
      error = {
        field_id: "password",
        message: "Enter some password"
      }
      return error;
    }

  }



  const update = (e, type) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setData({
      ...data, [name]: value
    })
  }

  const submit = (e) => {
    // e.preventDefault();
    setErrormessage(null)

    let error = validateForm();
    if (error) {

      setErrormessage(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the input fields!',
        timer: 5000
      })
      return;
    }

    else {
      const userdetails = {
        email: data.email,
        password: data.password
      }

      console.log(userdetails);
      Axios.post("http://localhost:8080/fetch/authuser", userdetails)
        .then(res => {
          message.success('Login Successfully');
          localStorage.clear();
          localStorage.setItem('auth', res.data.auth)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('First_Name', res.data.userDetails.fname)
          localStorage.setItem('Last_Name', res.data.userDetails.lname)
          localStorage.setItem('image', res.data.userDetails.image)

          navigate("/")

          console.log(res.data)

        })
        .catch(err => {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 5000
          })


          console.log("error has occured while login new member : " + err)
        })
    }

  }


  return (
    <>
      <div className='loginform'>
        {/* Header file start here */}
        <Header></Header>
        {/* Header file end here */}

        {/* register form start here */}
        <div className="container">
          <div className="row row-no-gutters" id='loginform'>
            <div className="col-6 m-0 p-0" id='loginlogoimage'>
              <img src={registerlogo}></img>
            </div>
            <div className="col-6 m-0 p-0">
              <div encType="multipart/form-data" className='loginformuserdetails'>

                <label>Email <span>*</span></label>

                <input type="text"
                  id='email'
                  onChange={(e) => update(e, 'email')}
                  name="email"
                  value={data.email}
                  placeholder="Enter Email Address"
                  className="email"
                />
                {/* {errormessage && errormessage.email !== '' ? <p className='errormessage'>{errormessage.email}</p> : null} */}
                {errormessage && errormessage.field_id === 'email' ? <p className='errormessage'>{errormessage.message}</p> : null}

                <br />
                <label>Password <span>*</span></label>
                <input type="text"
                  id='password'
                  onChange={(e) => update(e, 'password')}
                  name="password"
                  value={data.phone}
                  placeholder="Enter password here"
                  className="pasword"
                />
                {/* {errormessage && errormessage.password !== '' ? <p className='errormessage'>{errormessage.password}</p> : null} */}
                {errormessage && errormessage.field_id === 'password' ? <p className='errormessage'>{errormessage.message}</p> : null}


                <button type="button "

                  onClick={(e) => submit(e)}
                  className="sub btn btn-primary">Login</button>

              </div>
            </div>
          </div>
        </div>
      </div>


      <Footer />


    </>
  )
}

export default Login