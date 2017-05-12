import { UserAuthWrapper } from 'redux-auth-wrapper'
import { browserHistory } from 'react-router'
import { pathToJS } from 'react-redux-firebase'

export const UserIsAuthenticated = UserAuthWrapper({
    wrapperDisplayName: 'UserIsAuthenticated',
    authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
    authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
    predicate: auth => auth !== null,
    redirectAction: newLoc => (dispatch) => {
        browserHistory.replace(newLoc);
        dispatch({
            type: 'UNAUTHED_REDIRECT',
            payload: { message: 'User is not authenticated.' }
        })
    }
})

export const UserIsNotAuth = UserAuthWrapper({
    wrapperDisplayName: 'UserIsNotAuthenticated',
    allowRedirectBack: false,
    failureRedirectPath: (state, props) =>
        // redirect to page user was on or to list path
    props.location.query.redirect || '/app',
    authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
    authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
    predicate: auth => auth === null,
    redirectAction: newLoc => (dispatch) => {
        browserHistory.replace(newLoc);
        dispatch({ type: 'AUTHED_REDIRECT' })
    }
})

export default { UserIsAuthenticated, UserIsNotAuth }