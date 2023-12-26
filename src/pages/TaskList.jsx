import React, { useContext, useReducer } from "react";
import TaskContext from "../Context/TaskContext";
import { formatDate } from "../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PopUp from "../components/PopUp";

const reducer = (state, action) => {
    switch (action.type) {
        case "view": return { actiontype: "view", data: action.payload }
        case "edit": return { actiontype: "edit", data: action.payload }
        case "delete": return { actiontype: "delete", data: action.payload }
        default: return state;

    }

}

function TaskList(props) {
    const { allTask } = useContext(TaskContext);
    const [state, dispatch] = useReducer(reducer, null)
   
    return (
        <>
            <div className="conatainer py-5">
                <div className="bg-primary p-4"></div>
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th>SR.No</th>
                            <th>Title</th>
                            <th>description</th>
                            <th>DueDate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allTask?.map((items) => (
                            <tr key={items.id}>
                                <td>{items.id}</td>
                                <td>{items.title}</td>
                                <td>{items.description}</td>
                                <td>{formatDate(items.duedate)}</td>
                                <td>
                                    <span className="px-2" data-bs-toggle="modal" data-bs-target="#task-list" onClick={() => dispatch({ type: "view", payload: items })}>
                                        <FontAwesomeIcon icon={faEye} />
                                    </span>
                                    <span className="px-2" data-bs-toggle="modal" data-bs-target="#task-list" onClick={() => dispatch({ type: "edit", payload: items })}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </span>
                                    <span className="px-2" data-bs-toggle="modal" data-bs-target="#task-list" onClick={() => dispatch({ type: "delete", payload: items })}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="modal " tabindex="-1" id="task-list">
                <div className="modal-dialog bg-primary">
                    {
                        state ?
                            <PopUp actiontype={state.actiontype} data={state.data}/> :""
                    }

                </div>
            </div>
        </>
    );
}

export default TaskList;
