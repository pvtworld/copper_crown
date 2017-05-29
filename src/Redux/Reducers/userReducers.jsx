export const showUserModalReducer = (state = {show: false}, action) => {
    switch (action.type){
        case 'SHOW_USERNAME_MODAL':
            return {show: true};
        case 'ADD_NEW_USER':
            return {show: false};
        default:
            return state;
    }
};