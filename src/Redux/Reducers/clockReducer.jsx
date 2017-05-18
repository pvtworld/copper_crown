const initialState = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    showEndText: false
};

export var deadlineClockReducer = (state = initialState, action) => {
    switch (action.type){
        case 'ADD_DAYS':
            return {...state, days: action.days};
        case 'ADD_HOURS':
            return {...state, hours: action.hours};
        case 'ADD_MINUTES':
            return {...state, minutes: action.minutes};
        case 'ADD_SECONDS':
            return {...state, seconds: action.seconds};
        case 'RESET_TIMER':
            return {...state, days: 0, hours: 0, minutes: 0, seconds: 0};
        case 'SHOW_END_TEXT':
            return {...state, showEndText: true };
        case 'RESET_END_TEXT':
            return {...state, showEndText: false };
        default:
            return state;
    }
};
