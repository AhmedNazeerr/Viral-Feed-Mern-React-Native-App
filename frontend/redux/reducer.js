import {setname,setemail,setrole,setpoll} from './action'

const intializestate={
    email:'',
    role:'',
    name:'',
    poll:''
}

function usereducer(state=intializestate,action){
    switch(action.type){
        case setemail:
            return {...state,email:action.payload}
        case setrole:
            return { ...state, role: action.payload }
        case setname:
            return { ...state, name: action.payload }
        case setpoll:
            return { ...state, poll: action.payload }

        default:
            return state
    }
}

export default usereducer;