export var copperSearchReducer = (state = {searching: false}, action) => {
    switch (action.type){
        case 'SEARCHING_FOR_COPPER':
            return {...state, searching: true};
        case 'COPPER_SEARCH_DONE':
            return {...state, searching: false};
        default:
            return state;
    }
};

export var loginReducer = (state = {loadingUser: false}, action ) => {
    switch (action.type){
        case 'LOGIN_STARTED':
            return {...state, loadingUser: true}
        case 'LOGIN_FINISHED':
            return {...state, loadingUser: false}
        case 'LOGIN_ERROR':
            return {...state, loadingUser: false}
        default:
            return state;
    }
}

export var displayRoofReducer = (state = {foundRoof: null, id: null, area: null}, action) => {
    switch (action.type){
        case 'DISPLAY_ROOF_NOT_TAKEN':
            return {...state, foundRoof: true, roofTaken: false, id: action.id, area: action.area};
        case 'DISPLAY_ROOF_TAKEN':
            return {...state, foundRoof: true, roofTaken: true, id: action.id, area: action.area};
        case 'DISPLAY_ROOF_NOT_FOUND':
            return {...state, foundRoof: false}
        case 'RESET_ROOF':
            return {...state, foundRoof: null, roofTaken: null, id: null, area: null}
        default:
            return state;
    }
};