
import { createContext, useEffect, useState } from "react"
import { json, useNavigate } from "react-router-dom"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [message, setmessage] = useState("")
    const [user, setuser] = useState(null)
  
  
    const navigate = useNavigate()

    // login user


    const login = async (formdata) => {
        // e.preventDefault()
        const response = await fetch(` http://localhost:5000/user?Email=${formdata.email}&Password=${formdata.password}`, { method: "GET" })
        const user = await response.json();
        console.log(user)
        if (user.length > 0) {
            setmessage('logged in successfull')
            localStorage.setItem('todouser', JSON.stringify(user[0]))
            setuser(user[0])
           setTimeout(() => {
            navigate('/task-list')
           }, 3000);
            
        }
        else {
            setmessage('create account')
        }
    }


    // check   user --------------------------------------->


    const getdata = async() => {
        const local = localStorage.getItem("todouser")
console.log(local)

        if(local)
        {
            const user = JSON.parse(local)
            const response =  await fetch(`http://localhost:5000/user?Email=${user.Email}`, { method: "GET" })
            if(response.ok)
            {
                const userdetail = await response.json()
                if(userdetail.length>0)
                {
                    setuser(user)
                }
                else{
                    localStorage.removeItem("todouser")
                    navigate("/")
                }
            }
            else{
                console.log("something wrong")
            }
        }
        
  
    }

    useEffect(() => {
        getdata();

    }, [])






    //  <------------------------------register  ------------------------------------------------------>


    const submit = async (formdata) => {



        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        }


        const checkuser = await fetch(`http://localhost:5000/user?Email=${formdata.Email}`, { method: "GET" })
        if (checkuser.ok) {

            const user = await checkuser.json()
            if (user.length > 0) {
                setmessage('user already exist ')
            }
            else {
                const response = await fetch(`http://localhost:5000/user`, config)
                console.log(response)
                if (response.status === 201) {
                    const user = await response.json()
                    setmessage("Registered successfully")

                    localStorage.setItem('todouser', JSON.stringify(user))

                   
                    setuser(user)
                    setTimeout(()=>{
                        navigate("/task-list");
                    }, 3000)



                }
                else {
                    setmessage('Something went wrong')
                }
            }
        }
        else {
            setmessage("something went wrong please try again ")

        }


    }


    // logout
    const logout = () => {
     
        localStorage.removeItem("todouser")

        setuser(null)
        navigate('/')

    }










  

    
    // ------------------------------> update 


   const update=async(data,user1)=>{
    
    const config = {
        method:"PATCH",
        headers :{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data,user1)
    }

// debugger
    const response = await fetch(`http://localhost:5000/user/${user1.id}`,config)
    console.log(response)
    if(response.ok)
    {
        const user = await response.json()
        localStorage.setItem("todouser" , JSON.stringify(user))
        console.log(user)
        setmessage("successfully update")
    setuser(user)
       setTimeout(() => {
        navigate("/profile")
       }, 3000);
    }
    else{
        setmessage("something Went Wrong")
    }


   }



 
  






    useEffect(() => {
        setmessage('');
    }, [])


    return (
        <AuthContext.Provider value={{
            user,
            login,
            message,
            setmessage,
            submit,
            getdata,
            logout,
            update,
           
          
           

        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext