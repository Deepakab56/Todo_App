import React, { useContext, useEffect, useRef, useState } from 'react';
import TaskContext from '../Context/TaskContext';
import AuthContext from '../auth/AuthContext';

function TaskForm(props) {

    const init = {
        title: "",
        description: "",
        duedate: ""
    }
    const { saveTask, iscreated, updateTask } = useContext(TaskContext)
    const { message, user, setmessage } = useContext(AuthContext)
    const { isUpdate, data, updatecancel, closebtn, ispopup } = props
    const [formdata, setformdata,] = useState(init)
    const inputfield = useRef()
    const [error, setErrors] = useState({
        title: [],
        description: [],
        duedate: []
    })

    const [dirty, setDirty] = useState({
        title: false,
        description: false,
        duedate: false
    })


   

useEffect(() => {
        if (data && isUpdate) {
            setformdata(data);
        }
    }, [data, isUpdate])


    useEffect(() => {
        setmessage("")
    }, [])

    useEffect(() => {
        if (iscreated) {
            setformdata(init)

        }

    }, [iscreated])


    // useEffect(()=>{
    //     if(user)
    //     {
    //         setformdata({
    //             userid:user.id
    //         })
    //     }
    // })

    const handlechange = (e) => {
        const { name, value } = e.target
        if (user) {
            setformdata((prev) => ({
                ...prev,
                [name]: value,
                userId: user.id,
                modifiedon: Date()

            }))
        }
    }


     // ------> use validation()
     const validate = () => {
        const errorData = {}
        errorData.title = []
        errorData.description = []
        errorData.duedate = []

        if (!formdata.title) {
            errorData.title.push("please enter the title")
        }

        if (!formdata.description) {
            errorData.description.push("please enter the description")
        }
        if (!formdata.duedate) {
            errorData.duedate.push("please enter the due date ")
        }

        setErrors(errorData)
    }

//---------> check validation()
    useEffect(validate, [formdata])


    const valid=()=>{
        let valid = true;
        for(let control in error)
        {
            if(error[control].length>0)
            {
                valid=false
            }
        }
        return valid
    }

    const onblurChange=(e)=>{
        const {name} = e.target
     
        setDirty((dirty)=>({
            ...dirty,
            [name]:true
        }))
        validate()

    }


    const onCreate = (e) => {
        e.preventDefault();
       if(valid())
       {
        saveTask(formdata)
       }
       else{
         const currValue = inputfield.current.value
         if(!currValue)
         {
            Object.keys(dirty).forEach((abc)=>dirty[abc]=true)
         }
         setmessage("please resolve error in the form")

       }

 setTimeout(() => {
            setmessage("")

        }, 1000)

    }


    const onCancel = (e) => {
        e.preventDefault();
        if (ispopup) {
            closebtn.current.click()

        } else {
            updatecancel(false)
            setformdata(init)
            setmessage("")
        }



    }

    const onUpdate = (e) => {
        e.preventDefault()
      updateTask(formdata)
      
    }
    return (
        <div className='w-50'>
            <h3 className='text-white'>{isUpdate ? "Update Task" : "Create Task"}</h3>
            <div className="card">
                <div className="card-body">
                    <form action="">
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Title</label>
                            <input type="text" ref={inputfield} className='form-control' name="title" id="" value={formdata?.title} onChange={handlechange} onBlur={onblurChange} />
                            <div className="text-danger">{dirty["title"] && error["title"] ? error["title"] : "" }</div>
                        </div>
                        <div className="mb-1">
                            <label htmlFor="" className="form-label">Title</label>
                            <textarea name="description" ref={inputfield} id="" cols="10" rows="5" value={formdata?.description} onChange={handlechange} onBlur={onblurChange} ></textarea>
                            <div className="text-danger">
                                {
                                    dirty["description"] && error["description"] ? error['description'] : ""
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="" className="form-label">Title</label>
                            <input type="datetime-local"  ref={inputfield} className='form-control' value={formdata?.duedate} name="duedate" id="" onChange={handlechange}  onBlur={onblurChange} />
                            <div className="text-danger">
                                {dirty["duedate"] && error["duedate"] ? error['duedate'] : ""}
                            </div>
                        </div>
                        <div className="mb-2">{message}</div>
                        {
                            isUpdate ?
                                <>
                                    <button className='btn btn-primary' onClick={onUpdate}>Update Task</button>
                                    <button className='btn btn-warning ms-2' onClick={onCancel}>Cancel</button>
                                </>
                                :
                                <button className='btn btn-primary' onClick={onCreate}>Create Task</button>
                        }

                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;