import { combineReducers,applyMiddleware } from "redux";
import { createStore } from "redux";
import thunk from  'redux-thunk'
import  usereducer  from "./reducer";

const rootreducer = combineReducers({usereducer})

export const store = createStore(rootreducer,applyMiddleware(thunk))