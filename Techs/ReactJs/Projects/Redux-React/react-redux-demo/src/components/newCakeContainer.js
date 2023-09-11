import React, { useState } from 'react'
import { connect } from 'react-redux'  //to connect two methods in one
import { buyCake } from '../redux'

const NewCakeContainer = (props) => {
    const [number, setNumber] = useState(1)
  return (
    <div>
        <h2>Number of Cakes - {props.numOfCakes}</h2>
        <input type='text' value={number} onChange={e => setNumber(e.target.value)}></input>
        <button onClick={() => props.buyCake(number)}>Buy {number} Cake</button>
    </div>
  )
}

const mapStateToProps = state => {
    return {
        numOfCakes: state.cake.numOfCakes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyCake: number => dispatch(buyCake(number))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCakeContainer) //connect both methods with the NewcakeContainer
//connect function just attaches whatever return in both the function to the props recieved into NewcakeContainer

//CONNECT function connects REACT COMPONENT to the REDUX STORE