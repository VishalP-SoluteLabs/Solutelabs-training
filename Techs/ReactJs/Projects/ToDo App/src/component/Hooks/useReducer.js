import React, { useReducer } from "react";
import "./style.css";

const UseReducer = () => {
  // const initialData = 15;
  const [myNum, setMyNum] = React.useState(0);


  const reducer = (state, action) => {
    if(action.type === 'INCR'){
      state += 1;
    }
    if(state > 0 && action.type === 'DECR'){
      state -= 1;
    }
    return state;
  }

  const initialValue = 0;
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <>
      <div className="center_div">
        <p>{state}</p>
        <div className="button2" onClick={() => dispatch({type: 'INCR'})}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          INCR
        </div>
        <div
          className="button2"
          onClick={() => dispatch({type: 'DECR'})}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          DECR
        </div>
      </div>
    </>
  );
};

export default UseReducer;