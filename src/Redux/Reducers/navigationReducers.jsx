export var showModalReducer = (state = {showModalString: ''}, action) => {
    switch (action.type){
        case 'SHOW_LEADERBOARD':
            return {...state, showModalString: 'SHOW_LEADERBOARD'};
        case 'SHOW_ABOUT':
            return {...state, showModalString: 'SHOW_ABOUT'};
        case 'SHOW_PLAYERINFO':
            return {...state, showModalString: 'SHOW_PLAYERINFO'};
        case 'SHOW_PROFILE':
            return {...state, showModalString: 'SHOW_PROFILE'};
        case 'RESET_MODAL':
            return {...state, showModalString: 'RESET_MODAL'};
        default:
            return state;
    }
};

