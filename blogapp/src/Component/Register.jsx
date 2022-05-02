import React, { useState } from 'react'
import Header from './Header'
import registerlogo from './Image/registerlogo.jpg'
import Axios from 'axios'
import Swal from 'sweetalert2';
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


     // this function is used to validate the input fields
     const validationcommon = (value, type) => {

        switch (type) {

            case 'string': {
                if (value) {
                    const strings = /^[a-zA-Z]{1,}$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

            
            case 'email': {
                if (value) {
                    const strings = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }

           

            case 'number': {
                if (value) {
                    const strings = /^(\+\d{1,3}[- ]?)?\d{10}$/
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }
        

            case 'password': {
                if (!value) {
                    // const strings = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                    // if (value && value.match(strings) && value.trim()) {
                        return true;
                    // } else {
                        // return false;
                    // }
                }
                return 'empty';
            }

            case 'cpassword': {
                if (!value) {
                    // const strings = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                    // if (value && value.match(strings) && value.trim()) {
                        return true;
                    // } else {
                        // return false;
                    // }
                }
                return 'empty';
            }

            

            case 'image': {
                if (value) {
                    console.log("image", value);
                    let ext = value.split('.');
                    if (value && (ext[1] === "jpg" || ext[1] === 'jpeg' || ext[1] === 'png' || ext[1] === 'gif' || ext[2] === "jpg" || ext[2] === 'jpeg' || ext[2] === 'png' || ext[2] === 'gif')) {
                        return true;
                    } else if (value.length < 5) {
                        return false;
                    }
                    else {
                        return false;
                    }
                }
                return 'empty';
            }



            default:
                break;
        }


    }


    //in this function we call validation common function to set error message
    const keyupValdation = (e, type) => {
        const { name, value } = e.target
        const res = validationcommon(value, type)
        let error
        if (res === 'empty') {
            error = "please enter your " + name
            return error;

        } else if (res === false) {
            error = "please enter your valid " + name
            return error;
        }
    }

     //this function is used to show error by clicking on tab
     const onKeyDown = (e, type) => {
        if (e.key === "Tab") {
            const { name, value } = e.target
            keyupValdation(e, type)
            setData({
                ...data, [name]: value
            })
            if (e.target.files) {
                setFileimage(e.target.files[0])
            }
            let error = keyupValdation(e, type)
            if (error) {
                e.preventDefault();

                setErrormessage({ ...errormessage, [name]: error })
                return error;
            } else {
                setErrormessage({ ...errormessage, [name]: '' })
                return error;

            }
        }
    };
   // this function is used for target input fields and also showing errors by this function

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
    let error = keyupValdation(e, type)
    if (error) {
        setErrormessage({ ...errormessage, [name]: error })
        return error;
    } else {
        setErrormessage({ ...errormessage, [name]: '' })
        return error;

    }
}

const submit = (e) => {
    // e.preventDefault();
if(errormessage)
{
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all the input fields!',
        timer: 5000
      })
}
else{
    let formData = new FormData();
    formData.append('image', document.querySelector('#image').files[0]);
    formData.append('fname', data.fname);
    formData.append('lname', data.lname);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('gender', data.gender);
    formData.append('password', data.password);

    console.log("this is data : ", data)
    Axios.post("http://localhost:8080/insert/registerUser", formData).then(res => {
        console.log("insert new member data : ", res.data)
        console.log("form data that we assign : " + formData)
       
        
          Swal.fire({
            icon: 'success',
            title: 'Good job!',
            text: 'Your account created successfullys!',
            timer: 5000
          })

          
        alert("Data submitted successfull", formData)
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
                    <div className="row" id='registerform'>
                        <div className="col-6" id='registerlogoimage'>
                            <img src={registerlogo}></img>
                        </div>
                        <div className="col-6">
                            <div encType="multipart/form-data" className='registrationformuserdetails'>
                                <label>First Name <span>*</span></label>

                                <input type="text"
                                    id='fname'
                                    onChange={(e) => update(e, 'string')}
                                    name="fname"
                                    value={data.fname}
                                    placeholder="Enter First name"
                                    className="fname"
                                onKeyDown={(e) => onKeyDown(e, 'string')}

                                />
                                {errormessage && errormessage.fname !== '' ? <p className='errormessage'>{errormessage.fname}</p> : null}
                                {/* {errormessage && errormessage.field_id === 'fname' ? <p className='errormessage'>{errormessage.message}</p> : null} */}

                                <br></br>

                                <label>Last Name <span>*</span></label>

                                <input type="text"
                                    id='lname'
                                    onChange={(e) => update(e, 'string')}
                                    name="lname"
                                    value={data.lname}
                                    placeholder="Enter Last name"
                                    className="lname"
                                onKeyDown={(e) => onKeyDown(e, 'string')}
                                />
                                {errormessage && errormessage.lname !== '' ? <p className='errormessage'>{errormessage.lname}</p> : null}
                                {/* {errormessage && errormessage.field_id === 'lname' ? <p className='errormessage'>{errormessage.message}</p> : null} */}
                                <br></br>

                                <label>Email <span>*</span></label>

                                <input type="text"
                                    id='email'
                                    onChange={(e) => update(e, 'email')}
                                    name="email"
                                    value={data.email}
                                    placeholder="Enter Email Address"
                                    className="email"
                                onKeyDown={(e) => onKeyDown(e, 'email')}
                                />
                                {errormessage && errormessage.email !== '' ? <p className='errormessage'>{errormessage.email}</p> : null}
                                {/* {errormessage && errormessage.field_id === 'email' ? <p className='errormessage'>{errormessage.message}</p> : null} */}
                                <br></br>

                                <label>Phone number <span>*</span></label>
                                <input type="text"
                                    id='phone'
                                    onChange={(e) => update(e, 'number')}
                                    name="phone"
                                     value={data.phone}
                                    placeholder="Enter phone number"
                                    className="num"
                                onKeyDown={(e) => onKeyDown(e, 'number')}
                                />
                                {errormessage && errormessage.phone !== '' ? <p className='errormessage'>{errormessage.phone}</p> : null}
                                {/* {errormessage && errormessage.field_id === 'phone' ? <p className='errormessage'>{errormessage.message}</p> : null} */}
                                <br></br>

                                <label className='selectgender'
                                    id="myForm">Gender <span>*</span></label>

                                <input type="radio"
                                    onChange={(e) => update(e)}
                                    name="gender"
                                    value="male"
                                    id="gender"
                                onKeyDown={(e) => onKeyDown(e, 'gender')}
                                checked={data.gender === 'male'}
                                /> Male

                                <input type="radio"
                                    onChange={(e) => update(e)}
                                    name="gender"
                                    value="female"
                                    id="gender"
                                onKeyDown={(e) => onKeyDown(e, 'gender')}
                                checked={data.gender === 'female'}
                                /> Female
                                {errormessage && errormessage.gender !== '' ? <p className='errormessage'>{errormessage.gender}</p> : null}
                                {/* {errormessage && errormessage.field_id === 'gender' ? <p className='errormessage'>{errormessage.message}</p> : null} */}



                                <br /><br />
                                <label>Password <span>*</span></label>
                                <input type="text"
                                    id='password'
                                    onChange={(e) => update(e, 'password')}
                                    name="password"
                                    //  value={data.phone}
                                    placeholder="Enter password here"
                                    className="pasword"
                                onKeyDown={(e) => onKeyDown(e, 'number')}
                                />
                                {errormessage && errormessage.password !== '' ? <p className='errormessage'>{errormessage.password}</p> : null}
                                {/* {errormessage && errormessage.field_id === 'phone' ? <p className='errormessage'>{errormessage.message}</p> : null} */}
                                <br></br>

                                <br /><br />
                                <label>Confirm Password <span>*</span></label>
                                <input type="text"
                                    id='cpassword'
                                    onChange={(e) => update(e, 'cpassword')}
                                    name="cpassword"
                                    //  value={data.phone}
                                    placeholder="Enter Confirm password here"
                                    className="cpasword"
                                onKeyDown={(e) => onKeyDown(e, 'number')}
                                />
                                {errormessage && errormessage.cpassword !== '' ? <p className='errormessage'>{errormessage.cpassword}</p> : null}
                                {/* {errormessage && errormessage.field_id === 'phone' ? <p className='errormessage'>{errormessage.message}</p> : null} */}
                                <br></br>


                                <br></br>
                                <label>Image <span>*</span></label>
                                <input type="file"
                                    className="image"
                                     onChange={(e) => update(e, "image")}
                                    name="image"
                                    id="image"
                                onKeyDown={(e) => onKeyDown(e, 'image')}

                                value={data.image}
                                /> <br />
                                {errormessage && errormessage.image !== '' ? <p className='errormessage'>{errormessage.image}</p> : null}

                                {errormessage && errormessage.field_id === 'image' ? <p className='errormessage'>{errormessage.message}</p> : null}
                                <br></br>
                                {fileimage ? <img id="selectImage" src={fileimage ? URL.createObjectURL(fileimage) : null} alt={fileimage ? fileimage.name : null} /> : <p>{data.filepath === '' ? null : <img src={`${data.filepath}`} id='imagesize'></img>}</p>}

                                <br></br>

                                <button type="button "
                                    onKeyDown={onKeyDown} 
                                    onClick={(e) => submit(e)}
                                    className="sub btn btn-primary">Create Account</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Register