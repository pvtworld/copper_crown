export var showModalReducer = (state = {showModalString: ''}, action) => {
    switch (action.type){
        case 'SHOW_LEADERBOARD':
            return {...state, showModalString: 'SHOW_LEADERBOARD'};
        case 'SHOW_GAME_INFO':
            return {...state, showModalString: 'SHOW_GAME_INFO'};
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

