import React, { useEffect, useState } from 'react';
import { json, useNavigate } from 'react-router-dom';

function ProtectedRoute({children}) {

    const [isloggedin , setIsloggedin] = useState()
    const navigate = useNavigate()

    useEffect(()=>{
        const local = localStorage.getItem("todouser")
        const userlocal = JSON.parse(local)
         if(!userlocal)
         {
            setIsloggedin(false)
            navigate("/")
            
         }
         setIsloggedin(true)
         
    },[])

    return (
        <div>
            {
                isloggedin ? children : null
            }
        </div>
    );
}

export default ProtectedRoute;