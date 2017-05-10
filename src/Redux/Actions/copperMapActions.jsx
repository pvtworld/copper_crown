export var searchForCopper = (searching) => {
    return {
        type: 'SEARCHING_FOR_COPPER',
        searching
    };
};

export var displayRoofInfo = (info) => {
    return {
        type: 'DISPLAY_ROOF_INFO',
        info
    };
};

export var setSearchPosition = (latitude, longitude) => {
    return {
        type: 'SET_SEARCH_POSITION',
        searchPos: {
            lat: latitude,
            long: longitude
        }
    };
};