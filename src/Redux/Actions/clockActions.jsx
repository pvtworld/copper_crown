export const addDays = (days) => {
    return {
        type: 'ADD_DAYS',
        days: days
    };
};

export const addHours = (hours) => {
    return {
        type: 'ADD_HOURS',
        hours: hours
    };
};

export const addMinutes = (minutes) => {
    return {
        type: 'ADD_MINUTES',
        minutes: minutes
    };
};

export const addSeconds = (seconds) => {
    return {
        type: 'ADD_SECONDS',
        seconds: seconds
    };
};

export const resetTimer = () => {
    return {
        type: 'RESET_TIMER',
    };
};

export const showEndText = () => {
    return {
        type: 'SHOW_END_TEXT',
    };
};

export const resetEndText = () => {
    return {
        type: 'RESET_END_TEXT',
    };
};

