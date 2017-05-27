import { fromJS } from 'immutable';

const initialState = fromJS({
    userID: '',
    messages: [],
    lastMessageTimestamp: null,
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
        default:
            return state;
    }
};
