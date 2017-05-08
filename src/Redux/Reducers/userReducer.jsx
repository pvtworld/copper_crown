const user = (state = {}, action) => {
    switch (action.type){
        case "DISPATCH_USER_LOGIN": 
            console.log(action.type);
            return {...state, uid: 1}
        case "USER_LOGOUT":
            return {...state, uid: undefined}
        default:
            return state
    }
}

export default user;