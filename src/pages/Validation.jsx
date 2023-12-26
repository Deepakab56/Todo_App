import React, { useEffect, useRef, useState } from "react";

function Validation(props) {
  const [formdata, setformdata] = useState([]);
  const inputfield = useRef()
  const password1 = useRef()
  const password2 = useRef()

  const [message , setmessage] = useState()
  const [error, setErrors] = useState({
    username: [],
    email: [],
    address: [],
    phone: [],
    gender: [],
    password: [],
    password_verify: [],
  });

  const [dirty, setDirty] = useState({
    username: false,
    email: false,
    address: false,
    phone: false,
    gender: false,
    password: false,
    password_verify: false,
  });

  const onhandleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const errorData = {};
    errorData.username = [];
    errorData.email = [];
    errorData.address = []
    errorData.phone = []
    errorData.gender=[]
    errorData.password=[]
    errorData.password_verify=[]
    if (!formdata.username) {
      errorData.username.push("please enter the user name ");
    }

    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;

    if (formdata.username) {
      if (!usernameRegex.test(formdata.username)) {
        errorData.username.push("please enter the valid username ");
      }
    }

    if (!formdata.email) {
      errorData.email.push("please enter the email ");
    }

    const emailregex =
      /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
    if (formdata.email) {
      if (!emailregex.test(formdata.email)) {
        errorData.email.push("please enter the valid email");
      }
    }

    if (!formdata.address) {
      errorData.address.push("please enter the address")
    }

    if (!formdata.phone) {
      errorData.phone.push("please enter the phone number")
    }

    const phoneregex = /^\+(?:[0-9] ?){11,11}[0-9]$/

    if (formdata.phone) {
      if (!phoneregex.test(formdata.phone)) {
        errorData.phone.push("please enter valid phone number")
      }
    }


    if(!formdata.gender)
    {
      errorData.gender.push("please select gender")
    }

     if(!formdata.password) 
     {
      errorData.password.push("please enter the password")
     }

     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

     if(formdata.password)
     {
      if(!passwordRegex.test(formdata.password)){
        errorData.password.push("please enter the strong password")
      }
     }


     if(!formdata.password_verify)
     {
      errorData.password_verify.push("please enter the re password")
     }
     
   
     
    setErrors(errorData)

  };




 

 
  

  useEffect(validate, [formdata])


  const valid = () => {
    let valid = true
    for (let control in error) {
      if (error[control].length > 0) {
        valid = false
      }
    }
    return valid
  }

  const onblueChange = (e) => {
    const { name } = e.target
    setDirty((prev) => ({
      ...prev,
      [name]: true
    }))
    validate()

  }


  const submit = (e) => {
    e.preventDefault()
    if (valid()) {
    console.log(formdata)
    }
    else {
      const currValue = inputfield.current.value
      if (!currValue) {
        Object.keys(dirty).forEach((abc) => dirty[abc] = true)
      }
      setmessage("please resolve error in the form ")
    }

  }

  return (
    <div>
      <div className="container w-100">
        <div className="mb-3 mt-4 d-flex flex-column align-items-center justify-content-center w-50">
          <form action="validation.jsx">
            <label htmlFor="" className="form-label">
              {" "}
              Username
            </label>
            <input
              type="text"
              name="username"
              id=""
              className="form-control"
              onChange={onhandleChange}
              ref={inputfield} onBlur={onblueChange}
            />
            <div className="text-danger">{dirty["username"] && error["username"] ? error["username"] : ""}</div>

            <label htmlFor="" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id=""
              className="form-control"
              onChange={onhandleChange}
              ref={inputfield} onBlur={onblueChange}
            />
            <div className="text-danger">{dirty["email"] && error["email"] ? error["email"] : ""}</div>

            <label htmlFor="" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              id=""
              className="form-control"
              onChange={onhandleChange}
              ref={inputfield} onBlur={onblueChange}
            />
<div className="text-danger">{dirty["address"] && error["address"] ? error["address"] : ""}</div>
            <label htmlFor="" className="form-label">
              Phone
            </label>
            <input
              type="phone"
              name="phone"
              id=""
              className="form-control"
              onChange={onhandleChange}
              ref={inputfield} onBlur={onblueChange}
            />
<div className="text-danger">{dirty["phone"] && error["phone"] ? error["phone"] : ""}</div>
            <div className="mt-2">
              <label htmlFor="" className="form-label mt-2">
                Gender
              </label>
              <input
                type="radio"
                name="gender"
                id=""
                value={"male"}
                onChange={onhandleChange}
                ref={inputfield} onBlur={onblueChange}
              />{" "}
              male
              <input
                type="radio"
                name="gender"
                id=""
                value={"female"}
                onChange={onhandleChange}
                ref={inputfield} onBlur={onblueChange}
              />{" "}
              female
            </div>

            <div className="text-danger">{dirty["gender"] && error["gender"] ? error["gender"] : ""}</div>

            <label htmlFor="" className="form-label">
              {" "}
              Create Password
            </label>
            <input
              type="password"
              name="password"
              id=""
              className="form-control"
              onChange={onhandleChange}
              ref={inputfield} onBlur={onblueChange}
            />
            <div className="text-danger">
              {dirty["password"] && error["password"] ? error["password"] : ''}
            </div>

            <label htmlFor="" className="form-label">
              {" "}
              Verify Password
            </label>
            <input
              type="password"
              name=" password_verify"
              id=""
              className="form-control"
              onChange={onhandleChange}
              ref={inputfield} onBlur={onblueChange}
            />
            <div className="text-danger">{dirty["password_verify"] && error["password_verify"] ? error["password_verify"] :""}</div>
<p className="text-danger">{message}</p>
            <button className=" btn btn-primary text-white mt-1 " onClick={submit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Validation;
