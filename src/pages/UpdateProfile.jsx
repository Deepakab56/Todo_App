import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthContext';


function UpdateProfile(props) {
    const {user,update} = useContext(AuthContext)
    const [formdata , setformdata] = useState('')
    const[image,setImage] =useState(null)


    useEffect(()=>{
        if(user)
        {
            setformdata(user)
        }
    },[user])



    // useEffect(()=>{
    //     if(user)
    //     {
    //         setformdata(user)
    //     }
    // })



    // ----------------> images converter ---------------------------->
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    const handleChange =  async(e) => {
        let file = e.target.files[0];
        let baseImage = await convertBase64(file);
          setImage(()=>({
            photo : baseImage
        }))
    }
   
    
   
    console.log(image)
    

const handlechange=(e)=>{
 const {name,value} = e.target
    if(user)
    {
        setformdata((prev)=>({
            ...prev,
           [name]:value,
             image: image?.photo,
        }))
    }
}
console.log(formdata)

// console.log(formdata)
const Edit=(e)=>{
e.preventDefault()
 update(formdata,user)
}
   
   
    return (


        <div>
            <div className="container mt-2">

                <div className="d-flex align-items-center justify-content-center bg-primary text-white   p-4 ">


                    <form >
                        <h1>Edit Profile</h1>
                        <div className="mb-3">
                            <label className="form-label"> Name</label>
                            <input type="text" name="name" id="" className='form-control circle-rounded' value={formdata?.name} onChange={handlechange} />
                      
                        </div>


                         <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="Email" id="" className='form-control circle-rounded' value={formdata?.Email} onChange={handlechange} />
                            </div>
                        <div className="mb-3">
                            <label className="form-label">Image </label>
                            <input type="file" name="Image" id="" className='form-control' onChange={handleChange} />

                        </div>
                        
                        <div className="mb-3">
                            <label className="form-label">Date of Birth </label>
                            <input type="date" name="DOB" id="" className='form-control' onChange={handlechange} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender </label>
                            <input type="text" name="gender" id="" className='form-control' onChange={handlechange} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="phone" name="phoneno" id="" className='form-control' onChange={handlechange} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Profession</label>
                            <input type="phone" name="profession" id="" className='form-control' onChange={handlechange} />

                        </div>
                       

                        <button className=" btn btn-primary" onClick={Edit} >Edit</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;