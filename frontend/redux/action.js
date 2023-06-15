export const setemail = "email"
export const setrole = "role"
export const setname = "name"
export const setpoll="poll"


export const Setemail = email => dispatch =>{
    dispatch({
        type:setemail,
        payload:email
    })
}

export const Setrole = role => dispatch => {
    dispatch({
        type: setrole,
        payload: role
    })
}
export const Setname = name => dispatch => {
    dispatch({
        type: setname,
        payload: name
    })
}
export const Setpoll = poll => dispatch => {
    dispatch({
        type: setpoll,
        payload: poll
    })
}