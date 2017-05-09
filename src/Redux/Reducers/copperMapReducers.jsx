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