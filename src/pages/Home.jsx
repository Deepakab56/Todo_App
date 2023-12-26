import React, { useState } from 'react';
import illustration from '../assets/illustration.png'
import { Link, Outlet } from 'react-router-dom';


function Home(props) {
    const [active, setActive] = useState('');

    const oncolorchange = (link) => {

        setActive(link);
    };




    return (
        <>
            <div className="container-fluid h-100">
                <div className="row h-100">
                    <div className="col-lg-6  d-flex flex-column align-items-center justify-content-center h-100 bg-primary">
                        <h1 className='title display-4 text-white text-center'>
                            An App to
                            <br />
                            Make your life <br />
                            <span className='dispaly-1 '>Easy</span>
                        </h1>
                        <img className='img-fluid mt-4' src={illustration} alt="" />
                    </div>
                    <div className={`col-lg-6 d-flex align-items-center justify-content-center h-100 `}>

                        <div className="card w-50 ">
                            <div className='card-header d-flex bg-black h-100 '>
                                <div className="d-flex w-50 bg-black h-100  "><Link to='/login' className={` w-100 h-100 py-3  text-center text-primary ${active === 'login' ? 'active' : ''}`} onClick={() => oncolorchange('login')} > Login</Link></div>
                                <div className="d-flex w-50 bg-black"><Link to='/register' className={` w-100 h-100 py-3 text-center text-primary ${active === 'register' ? 'active' : ''} `} onClick={() => oncolorchange('register')}  >Register</Link></div>


                            </div>
                            <div className="card-body">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Home;