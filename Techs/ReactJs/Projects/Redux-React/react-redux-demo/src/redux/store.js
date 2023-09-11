import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; 

const store =  createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));
                         //composeWithDevTools - for using redux devTools    //thunk is used to define async actions in our application

export default store    