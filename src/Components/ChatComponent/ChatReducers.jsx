import { fromJS } from 'immutable';

const initialState = fromJS({
    userID: '',
    messages: [],
    lastMessageTimestamp: null,
    usersInChat: [],
    profilePictureURL: '',
    showProfilePicture: true
});

export var chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_AUTH_ID':
            return state.update('userID', () => action.payload);
        case 'ADD_MESSAGE':
            return state.update('messages', (messages) => messages.concat(action.payload));
        case 'ADD_MESSAGE_HISTORY':
            return state
                .update('messages', (messages) => messages.unshift(...action.payload.messages))
                .update('lastMessageTimestamp', () => action.payload.timestamp);
        case 'ADD_USER_TO_LIST':
            return state
                .update('usersInChat', (users) => (users.indexOf(action.payload) >= 0 ?
                    users :
                    users.concat(action.payload)));
        case 'REMOVE_USER_FROM_LIST':
            console.log('REMOVING USER, UPDATING STATE')
            return state
                .update('usersInChat', (users) => users.filter((element) => element !== action.payload ));
        case 'SET_PROFILE_PICTURE':
            return state.update('profilePictureURL', () =>  action.payload);
        case 'SHOW_PROFILE_PICTURE':
            return state.update('showProfilePicture', () =>  action.payload);
        default:
            return state;
    }
};
