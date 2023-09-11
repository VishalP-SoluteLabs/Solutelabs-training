import React from 'react'
import { connect } from 'react-redux'  //to connect two methods in one
import { buyCake } from '../redux'

const CakeContainer = (props) => {
  return (
    <div>
        <h2>Number of Cakes - {props.numOfCakes}</h2>
        <button onClick={props.buyCake}>Buy Cake</button>
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
        buyCake: () => dispatch(buyCake())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer) //connect both methods with the cakeContainer
//connect function just attaches whatever return in both the function to the props recieved into cakeContainer

//CONNECT function connects REACT COMPONENT to the REDUX STORE