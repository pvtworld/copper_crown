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

export function addUserToOnlineList(message) {
    return {
        type: 'ADD_USER_TO_LIST',
        payload: message,
    };
}

export function removeUserFromOnlineList(message) {
    return {
        type: 'REMOVE_USER_FROM_LIST',
        payload: message,
    };
}

export function showProfilePicture(bool) {
    return {
        type: 'SHOW_PROFILE_PICTURE',
        payload: bool
    };
}

export function setProfilePicture(profileURL) {
    return {
        type: 'SET_PROFILE_PICTURE',
        payload: profileURL
    };
}

