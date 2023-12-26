import React, { useContext, useEffect, useRef, useState } from 'react';

import AuthContext from './AuthContext';


function Register(props) {


    const { submit, setmessage, message } = useContext(AuthContext)
    const [formdata, setformdata] = useState([])
    const inputfield = useRef(null)
    // --------> error and dirty states to manage error and message 
    const [errors, setErrors] = useState(
        {
            Email: [],
            name: [],
            Password: []
        }
    )
    const [dirty, setDirty] = useState({
        name: false,
        Email: false,
        Password: false

    })


    // ------ > function validate

    const validate = () => {
        const errorData = {}
        errorData.Email = []
        errorData.Password = []
        errorData.name = []

        if (!formdata.Email) {
            errorData.Email.push("please provide email")
        }


        let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
        if (formdata.Email) {
            if (!emailreg.test(formdata.Email)) {
                errorData.Email.push("please enter the valid email")
            }
        }

        // ------> name

        if (!formdata.name) {
            errorData.name.push("please provide name")
        }

        //=========> password
        if (!formdata.Password) {
            errorData.Password.push("please enter password")
        }
        setErrors(errorData)
    }


    useEffect(validate, [formdata])


    const isValid = () => {
        let valid = true
        for (let control in errors) {
            if (errors[control].length > 0) {
                valid = false
            }
        }
        return valid
    }



    const handlechange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setformdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }




    const onBlurHandle = (e) => {
        const { name } = e.target
        setDirty((dirty) => ({
            ...dirty,
            [name]:true
        }))
        validate()

    }

    const submitForm = (e) => {
        e.preventDefault();
        if (isValid()) {
            submit(formdata)
        }
        else {

            const currValue = inputfield.current.value
            if (!currValue) {
                Object.keys(dirty).forEach((abc) => dirty[abc] = true)
            }
            setmessage("Please resolve errors in the form");
        }

    }

    useEffect(() => {
        setmessage("");
    }, [])

    return (
        <form action="">

            <div className="mb-3">
                <label className="form-label">  Name </label>
                <input ref={inputfield} type="text" name="name" id="" className='form-control' onChange={handlechange} onBlur={onBlurHandle} />
                <div className="text-danger">{dirty["name"] && errors["name"][0] ? errors["name"] : ""}</div>

            </div>
            <div className="mb-3">
                <label className="form-label"> Email </label>
                <input ref={inputfield} type="email" name="Email" id="" className='form-control' onChange={handlechange} onBlur={onBlurHandle} />
                <div className="text-danger">{dirty["Email"] && errors["Email"][0] ? errors["Email"] : ""}</div>

            </div>
            <div className="mb-3">
                <label className="form-label">Password </label>
                <input ref={inputfield} type="password" name="Password" id="" className='form-control' onChange={handlechange} onBlur={onBlurHandle} />
                <div className="text-danger">{dirty["Password"] && errors["Password"][0] ? errors["Password"] : ""}</div>

            </div>
            <p className='text-danger'> {message}</p>
            <button className=" btn btn-primary" onClick={submitForm}> Register</button>
        </form>
    );
}

export default Register;