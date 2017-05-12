export const searchForCopper = () => {
    return {
        type: 'SEARCHING_FOR_COPPER'
    };
};

export const searchDone = () => {
    return {
        type: 'COPPER_SEARCH_DONE'
    };
};


export const displayRoofTaken = (roof) => {
    return {
        type: 'DISPLAY_ROOF_TAKEN',
        id: roof.id,
        value: roof.value,
        area: roof.area
    }
}

export const displayRoofNotTaken = (roof) => {
    return {
        type: 'DISPLAY_ROOF_NOT_TAKEN',
        id: roof.id,
        value: roof.value,
        area: roof.area
    }   
}

export const displayRoofNotFound = () => {
    return {
        type: 'DISPLAY_ROOF_NOT_FOUND'
    }
}

export const resetRoof = () => {
    return{
        type: 'RESET_ROOF'
    }
}

export const loadingUser = () => {
    return {type: 'LOGIN_STARTED'}
}

export const finishedLoadingUser = () => {
    return {type: 'LOGIN_FINISHED'}
}

export const loadingError = () => {
    return {type: 'LOGIN_ERROR'}
}

export const fetchingPrice = () => {
    return{
        type: 'FETCHING_COPPER_PRICE'
    }
}

export const copperPriceReturned = (item) => {
    return{
        type: 'COPPER_PRICE_RETURNED',
        price: item
    }
}