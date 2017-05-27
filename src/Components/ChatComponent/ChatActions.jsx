export function setUserAuthID(authID) {
    return {
        type: 'SET_AUTH_ID',
        payload: authID,
    };
}

export function addMessageToList(message) {
    return {
        type: 'ADD_MESSAGE',
        payload: message,
    };
}

export function addHistoryToList(messages, timestamp) {
    return {
        type: 'ADD_MESSAGE_HISTORY',
        payload: {
            messages,
            timestamp,
        },
    };
}