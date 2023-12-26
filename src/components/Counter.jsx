import React, { useReducer } from 'react'

const reducer =(state , action)=>{

    switch(action.type){

        case "INCREAMENT":return state+1;
        case "DECREAMENT":return state-1;
        case "RESET" :return 0;
        case "ADDFIVE":return state+ action.payload;
        default : return state;

    }

}

export default function Counter() {
    // useReducer() hook is used to manage complex states;

    const[state , dispatch] = useReducer(reducer,0)
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={()=>{dispatch({type :"INCREAMENT"})}}>increament</button>
      <button>decreament</button>
      <button>Reset</button>
      <button onClick={()=>{dispatch({type:"ADDFIVE" , payload:10})}}>add 5</button>
     
    </div>
  )
}
