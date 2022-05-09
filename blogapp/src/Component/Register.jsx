import React, { useState } from 'react'
import Header from './Header'
import registerlogo from './Image/registerlogo.jpg'
import Axios from 'axios'
import Swal from 'sweetalert2';
import { message } from 'antd';
import 'antd/dist/antd.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: '',
        image: '',
        filepath: '',
        password: '',
        cpassword: ''

    })

    const [errormessage, setErrormessage] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: '',
        image: '',
        filepath: '',
        password: '',
        cpassword: ''

    })

    let { fname, lname, email, phone, gender, password, cpassword, image } = data;
    const [fileimage, setFileimage] = useState(null);
    const navigate = useNavigate();


    // this function is used to validate the input fields

    const validateForm = () => {
        let error = false;

        if (fname.trim() === '') {
            error = {
                field_id: "fname",
                message: " * First name can't be pass blank"
            }
            return error;
        }
        if (fname === '') {
            error = {
                field_id: "fname",
                message: " * First name is required"
            }
            return error;
        }

        let fnamecond = /^[A-Za-z\s]+$/
        if (fnamecond.test(fname) === false) {
            error = {
                field_id: "fname",
                message: "* First name is not correct"
            }
            return error;
        }

        if (lname.trim() === '') {
            error = {
                field_id: "lname",
                message: "Last name can't be pass blank"
            }
            return error;
        }

        if (lname === '') {
            error = {
                field_id: "lname",
                message: "Last name is required"
            }
            return error;
        }

        let lnamecond = /^[A-Za-z\s]+$/
        if (lnamecond.test(lname) === false) {
            error = {
                field_id: "lname",
                message: "* Last name is not correct"
            }
            return error;
        }

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

        if (phone === '') {
            error = {
                field_id: "phone",
                message: "Phone number is required"
            }
            return error;
        }

        let phonecond = /^(\+\d{1,3}[- ]?)?\d{10}$/
        if (phonecond.test(phone) === false) {
            error = {
                field_id: "phone",
                message: "* Phone number is not correct"
            }
            return error;
        }




        if (gender === '') {
            error = {
                field_id: "gender",
                message: "Choose your gender"
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

        if (cpassword === '') {
            error = {
                field_id: "cpassword",
                message: "Enter Confirm password"
            }
            return error;
        }
        else {
            if (cpassword != password) {
                error = {
                    field_id: "cpassword",
                    message: "Password doesn't match."
                }
                return error;
            }
        }




        // let ext = image.split('.');
        // if (ext[1] === "jpg" || ext[1] === 'jpeg' || ext[1] === 'png' || ext[1] === 'gif' || ext[2] === "jpg" || ext[2] === 'jpeg' || ext[2] === 'png' || ext[2] === 'gif') {
        //     console.log("image passsed")
        // }
        // else {
        //     error = {
        //         field_id: "image",
        //         message: "* only image should be here"
        //     }

        //     return error;
        // }



    }



    const update = (e, type) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setData({
            ...data, [name]: value
        })
        if (e.target.files) {
            setFileimage(e.target.files[0])
        }

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
        }

        else {
            let formData = new FormData();
            console.log(data.image)
            let image = data.image
            formData.append('image',  document.querySelector('#image').files[0]);
            formData.append('fname', data.fname);
            formData.append('lname', data.lname);
            formData.append('email', data.email);
            formData.append('phone', data.phone);
            formData.append('gender', data.gender);
            formData.append('password', data.password);

            console.log("this is data : ", data);


            Axios.post("http://localhost:8080/insert/registerUser", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    console.log(res.data.data)
                    let userdetails = res.data.data
                    message.success('Account created successfully.');
                    navigate("/login")

                })
                .catch(err => {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        timer: 5000
                    })


                    console.log("error has occured while insert new member : " + err)
                })

        }


    }




    return (
        <>
            <div className='registrationform'>
                {/* Header file start here */}
                <Header></Header>
                {/* Header file end here */}

                {/* register form start here */}
                <div className="container">
                    <div className="row row-no-gutters" id='registerform'>
                        <div className="col-6 m-0 p-0" id='registerlogoimage'>
                            <img src={registerlogo}></img>
                        </div>
                        <div className="col-6 m-0 p-0">
                            <div method='post' encType="multipart/form-data" className='registrationformuserdetails'>

                                <label>First Name <span>*</span></label>

                                <input type="text"
                                    id='fname'
                                    onChange={(e) => update(e, 'string')}
                                    name="fname"
                                    value={data.fname}
                                    placeholder="Enter First name"
                                    className="fname"

                                />
                                {/* {errormessage && errormessage.fname !== '' ? <p className='errormessage'>{errormessage.fname}</p> : null} */}
                                {errormessage && errormessage.field_id === 'fname' ? <p className='errormessage'>{errormessage.message}</p> : null}


                                <label>Last Name <span>*</span></label>

                                <input type="text"
                                    id='lname'
                                    onChange={(e) => update(e, 'string')}
                                    name="lname"
                                    value={data.lname}
                                    placeholder="Enter Last name"
                                    className="lname"
                                />
                                {/* {errormessage && errormessage.lname !== '' ? <p className='errormessage'>{errormessage.lname}</p> : null} */}
                                {errormessage && errormessage.field_id === 'lname' ? <p className='errormessage'>{errormessage.message}</p> : null}

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


                                <label>Phone number <span>*</span></label>
                                <input type="text"
                                    id='phone'
                                    onChange={(e) => update(e, 'number')}
                                    name="phone"
                                    value={data.phone}
                                    placeholder="Enter phone number"
                                    className="num"
                                />
                                {/* {errormessage && errormessage.phone !== '' ? <p className='errormessage'>{errormessage.phone}</p> : null} */}
                                {errormessage && errormessage.field_id === 'phone' ? <p className='errormessage'>{errormessage.message}</p> : null}


                                <label className='selectgender'
                                    id="myForm">Gender <span>*</span></label>

                                <input type="radio"
                                    onChange={(e) => update(e)}
                                    name="gender"
                                    value="male"
                                    id="gender"
                                    checked={data.gender === 'male'}
                                /> Male

                                <input type="radio"
                                    onChange={(e) => update(e)}
                                    name="gender"
                                    value="female"
                                    id="gender"
                                    checked={data.gender === 'female'}
                                /> Female
                                {/* {errormessage && errormessage.gender !== '' ? <p className='errormessage'>{errormessage.gender}</p> : null} */}
                                {errormessage && errormessage.field_id === 'gender' ? <p className='errormessage'>{errormessage.message}</p> : null}



                                <br />
                                <label>Password <span>*</span></label>
                                <input type="text"
                                    id='password'
                                    onChange={(e) => update(e, 'password')}
                                    name="password"
                                    //  value={data.phone}
                                    placeholder="Enter password here"
                                    className="pasword"
                                />
                                {/* {errormessage && errormessage.password !== '' ? <p className='errormessage'>{errormessage.password}</p> : null} */}
                                {errormessage && errormessage.field_id === 'password' ? <p className='errormessage'>{errormessage.message}</p> : null}


                                <label>Confirm Password <span>*</span></label>
                                <input type="text"
                                    id='cpassword'
                                    onChange={(e) => update(e, 'cpassword')}
                                    name="cpassword"
                                    //  value={data.phone}
                                    placeholder="Enter Confirm password here"
                                    className="cpasword"
                                />
                                {/* {errormessage && errormessage.cpassword !== '' ? <p className='errormessage'>{errormessage.cpassword}</p> : null} */}
                                {errormessage && errormessage.field_id === 'cpassword' ? <p className='errormessage'>{errormessage.message}</p> : null}




                                <label>Image <span>*</span></label>
                                <input type="file"
                                    className="image"
                                    onChange={(e) => update(e, "image")}
                                    name="image"
                                    id="image"

                                    value={data.image}
                                /> <br />
                                {/* {errormessage && errormessage.image !== '' ? <p className='errormessage'>{errormessage.image}</p> : null} */}

                                {errormessage && errormessage.field_id === 'image' ? <p className='errormessage'>{errormessage.message}</p> : null}

                                {fileimage ? <img id="selectImage" src={fileimage ? URL.createObjectURL(fileimage) : null} alt={fileimage ? fileimage.name : null} /> : <p>{data.filepath === '' ? null : <img src={`${data.filepath}`} id='imagesize'></img>}</p>}



                                <button type="button "

                                    onClick={submit}
                                    className="sub btn btn-primary">Create Account</button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />


        </>
    )
}

export default Register