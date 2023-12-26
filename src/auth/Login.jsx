import React, { useContext, useEffect, useRef, useState } from 'react';

import AuthContext from './AuthContext';

function Login(props) {

    const { login, message, setmessage } = useContext(AuthContext)
    const [formdata, setformdata] = useState([])
    const inputfield = useRef(null)
    const [errors, setErrors] = useState({
        email: [],
        password: []
    })
    const [dirty, setDirty] = useState({
        email: false,
        password: false
    })


    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        setformdata((prev) => ({
            ...prev,
            [name]: value
        }))
        validate()
    }

    console.log(formdata)

    const validate = () => {
        const errorData = {}
        errorData.email = []
        errorData.password = []

        if (!formdata.email) {
            errorData.email.push("please enter the email")
        }


       
        let emailreg = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
        if (formdata.email) {
            if (!emailreg.test(formdata.email))
                errorData.email.push("please enter the valid email")
        }

        if (!formdata.password) {
            errorData.password.push("please enter password")
        }

        setErrors(errorData)

    }


    const isValid = () => {
        let valid = true
        for (let control in errors) {
            if (errors[control].length > 0) {
                valid = false
            }
        }
        return valid
    }



    useEffect(validate, [formdata])




    const onblurChange = (e) => {
        const { name } = e.target
       setDirty((dirty)=>({
        ...dirty,
        [name]:true
       }))
validate()
    }

    const submitForm = (e) => {
        e.preventDefault();
        if (isValid()) {
            login(formdata)
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

        <>

            <form action="">
                <div className="mb-3">
                    <label htmlFor="" className="form-label"> Email</label>
                    <input type="email" ref={inputfield} name="email" className='form-control' onBlur={onblurChange} onChange={handleChange} />
                    <div className="text-danger">{dirty["email"] && errors["email"][0] ? errors["email"] : ""}</div>
                    <label htmlFor="" className="password">Password</label>
                    <input type="password" ref={inputfield} name="password" id="" className='form-control' onChange={handleChange} onBlur={onblurChange} />
                    <div className="text-danger">{dirty["password"] && errors["password"][0] ? errors["password"] : ""}</div>
                    {message}
                    <button className="btn btn-primary" onClick={submitForm}>Login</button>
                </div>

            </form>
        </>
    );
}

export default Login;