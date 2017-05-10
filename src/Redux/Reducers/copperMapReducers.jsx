export var copperSearchReducer = (state = false, action) => {
    switch (action.type){
        case 'SEARCHING_FOR_COPPER':
            return action.searching;
        default:
            return state;
    }
};

export var displayRoofReducer = (state = false, action) => {
    switch (action.type){
        case 'DISPLAY_ROOF_INFO':
            return true;
        default:
            return state;
    }
};

export var searchPosReducer = (state = {lat: 0, long: 0}, action) => {
    switch (action.type){
        case 'SET_SEARCH_POSITION':
            return action.searchPos;
        default:
            return state;
    }
};