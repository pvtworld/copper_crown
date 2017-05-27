export var showModalReducer = (state = {showModalString: ''}, action) => {
    switch (action.type){
        case 'SHOW_LEADERBOARD':
            return {...state, showModalString: 'SHOW_LEADERBOARD'};
        case 'SHOW_GAME_INFO':
            return {...state, showModalString: 'SHOW_GAME_INFO'};
        case 'SHOW_PROFILE':
            return {...state, showModalString: 'SHOW_PROFILE'};
        case 'RESET_MODAL':
            return {...state, showModalString: 'RESET_MODAL'};
        case 'SHOW_GAME_CHAT':
            return {...state, showModalString: 'SHOW_GAME_CHAT'};
        case 'SHOW_STATISTICS':
        return {...state, showModalString: 'SHOW_STATISTICS'};
        default:
            return state;
    }
};

