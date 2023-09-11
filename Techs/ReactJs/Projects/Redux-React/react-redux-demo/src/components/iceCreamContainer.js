import React from 'react'
import { connect } from 'react-redux'  //to connect two methods in one
import { buyIceCream } from '../redux'

const IceCreamContainer = (props) => {
  return (
    <div>
        <h2>Number of Ice Cream - {props.numOfIceCreams}</h2>
        <button onClick={props.buyIceCream}>Buy Ice Cream</button>
    </div>
  )
}

const mapStateToProps = state => {
    return {
        numOfIceCreams: state.iceCream.numOfIceCreams
    }
}

const mapDispatchToProps = dispatch => {
    return {
        buyIceCream: () => dispatch(buyIceCream())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IceCreamContainer) //connect both methods with the IceCreamContainer
//connect function just attaches whatever return in both the function to the props recieved into IceCreamContainer

//CONNECT function connects REACT COMPONENT to the REDUX STORE