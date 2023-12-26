import { createContext, useContext, useEffect, useState } from "react";
import { json } from "react-router-dom";
import AuthContext from "../auth/AuthContext";

const TaskContext = createContext();






export const TaskProvider = ({ children }) => {

    const {setmessage,user} = useContext(AuthContext)
    const [allTask,setAlltask]=useState(null)
const [recentTask , setrecentTask]= useState(null)
const [lastestTask,setLastestTask]=useState(null)
const[iscreated , setIscreated]=useState(false)


    const getAlltask=async()=>{
        const respones = await fetch(` http://localhost:5000/tasks?userId=${user.id}`,{method:"GET"})

        if(respones.ok)
        {
            const tasklist = await respones.json()
            
            setAlltask(tasklist);
            let lastest = tasklist[tasklist.length-1];
            setLastestTask(lastest);
            let recent = tasklist.slice(-3);
            setrecentTask(recent)
        }
        else{
            console.log("somethig wrong")
        }
    }



useEffect(()=>{
if(user)
{
    getAlltask();
}
},[user])


    // create ------------------------------------------------------------->

 const saveTask=async(formdata)=>{

    const config ={
        method :"POST",
        headers :{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formdata)
    }

    const response = await fetch(` http://localhost:5000/tasks`,config)
    if(response.status==201)
    {
        const user = response.json()
  setmessage("Task created successfully ")
  setIscreated(true)
 

    }
    else{
        setmessage("something wrong went ")
    }


 }
 


// updateTask
 
 const updateTask=async(formdata)=>{
    const config = {
        method:"PATCH",
        headers :{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formdata)
    }

    const respones = await fetch(` http://localhost:5000/tasks/${formdata.id}`,config)
    console.log(respones)
    if(respones.ok)
    {
        setmessage("Task updated successfully ");

    }
    else{
        setmessage("something went wrong , please try again")
    }
 }


 // get data 




 // deleteTask


 const deleteTask=async(id)=>{
    const response = await fetch(`http://localhost:5000/tasks/${id}`,{method:"DELETE"})
    console.log(response)
    if(response.ok)
    {
        setmessage("delete successfully Task")
        getAlltask();
    }
    else{
        setmessage("Something went wrong")
    }


 }

    return (
        <TaskContext.Provider value={{
            saveTask,setmessage,recentTask,lastestTask,iscreated,updateTask,allTask,deleteTask
        }}>
            {children}

        </TaskContext.Provider>
    )
}



export default TaskContext;