import React, { useContext, useEffect, useRef } from 'react';
import { formatDate } from '../helper';
import TaskForm from './TaskForm';
import TaskContext from '../Context/TaskContext';
import AuthContext from '../auth/AuthContext';

function PopUp(props) {
  const { actiontype, data } = props
  const closebtn = useRef(null)
  const { deleteTask } = useContext(TaskContext)
  const { message, setmessage } = useContext(AuthContext)


  const onDelete = (e) => {
   if(data)
   {
    deleteTask(data.id)
    setTimeout(() => {
     closebtn.current.click();
    }, 2000);
   }

   


  }

  // useEffect(() => {
  //   setmessage("")
  // })



  return (


    <>

      <div className="modal-content bg-primary text-white">
        <div className="modal-header">
          <h5 className="modal-title">Modal title</h5>
          <button type="button " ref={closebtn} className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          {
            actiontype === "view" ?
              <div>
                <h5>{data?.title}</h5>

                <p>{data?.description}</p>
                <div className="d-flex text-warning align-items-center">
                  <p className="mb-0">
                    modifiedon {formatDate(data?.modifiedon)}
                  </p>
                  <p className="mb-0">
                    modifiedon {formatDate(data?.duedate)}
                  </p>
                </div>
              </div>
              : actiontype === "edit" ?
                <div>
                  <TaskForm isUpdate={true} data={data} closebtn={closebtn} ispopup={true} />
                </div>
                :
                <div>
                  {
                    message !== "" ?
                      <p>{message}</p> 

                      : <p>Are you Sure , you went to delete this Task ?</p>
                  }

                  <div className="d-flex mt-5">
                    <button className='btn btn-danger me-2 ms-auto ' onClick={onDelete}>yes</button>
                    <button className='btn btn-warning'  data-bs-dismiss="modal"  aria-label="Close" >No</button>
                  </div>


                </div>
          }


        </div>

      </div >

    </>
  );
}

export default PopUp;