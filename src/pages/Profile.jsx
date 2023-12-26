import React, { useContext, useEffect, useState } from 'react';

import {  useNavigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';




function Profile(props) {
  
    const {user} = useContext(AuthContext)
    console.log(user)
   




   
const navigate = useNavigate()

const EditProfile=()=>{
    navigate("/UpdateProfile")

}

    return (
        <>
            <div className="container mt-4  bg-primary text-white p-4 w-60">
                <div className="row">
                    <div className="col-sm-5 d-flex align-items-center justify-content-center    ">
                        <img src={user?.image} alt="" className='image border rounded-circle' width={200} height={200} />

                    </div>
                    <div className="col-sm-5 offset-sm-2">
                        <h4>{user?.name}</h4>
                        <p>{user?.Email}</p>
                        <p> {user?.phoneno}</p>
                        <p> {user?.gender}</p>
                        <p> {user?.profession}</p>
                        <p> {user?.DOB}</p>
                       
                       

                       <button className='btn btn-warning' onClick={EditProfile}> Edit Profile</button>
                    </div>
                </div>
            </div>

           
           

        </>
    );
}

export default Profile; 