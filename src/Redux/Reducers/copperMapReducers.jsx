export var copperMapReducer = (state = false, action) => {
    switch (action.type){
        case 'TOGGLE_COPPER_SEARCH':
            return !state;
        default:
            return state;
    }
};