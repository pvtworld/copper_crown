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