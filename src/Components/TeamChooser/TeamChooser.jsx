import React from 'react';
import {connect, store} from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase'
import {Modal, Button} from 'react-bootstrap';

const addTeam = (firebase, uid, userInfo, dispatch, school, schoolClass) => {

    dispatch({type: 'UPDATE_TEAM_INFO'})
    firebase.set(`users/${uid}`, {
        points: userInfo.points,
        areaOfCopper: userInfo.areaOfCopper,
        roofsStolen: userInfo.roofsStolen,
        school: school,
        schoolClass: schoolClass
    })
}
const TeamChooser = (props) => {

    let school = null
    let schoolClass = null;

    const handleSchoolChange = (event) => {
        school = event.target.value;
    }

    const handleClassChange = (event) => {
        schoolClass = event.target.value;
    }

    if (props.userInfo) {
        if (!props.userInfo.school) {
            return (
                <div className="static-modal">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Choose Team</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <select onChange={handleSchoolChange}>
                                <option value="-1">Välj Skola</option>
                                <option value="Skola1">Skola1</option>
                                <option value="Skola2">Skola2</option>
                                <option value="Skola3">Skola3</option>
                            </select>
                            <select onChange={handleClassChange}>
                                <option value="-1">Välj Klass</option>
                                <option value="8a">8a</option>
                                <option value="8b">8b</option>
                                <option value="8c">8c</option>
                            </select>
                        </Modal.Body>

                        <Modal.Footer>
                                <Button bsStyle="success" bsSize="large" block onClick={() => addTeam(props.firebase, props.auth.uid, props.userInfo, props.dispatch, school, schoolClass)} >Ok</Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </div>
            )
        }
    }
    return null

}

const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined,
    teams: dataToJS(firebase, '/teams')

})

const propsConnected = connect(mapStateToProps)(TeamChooser);

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? `users/${auth.uid}` : '/',  '/teams']))(propsConnected);

const authConnected = connect(
    ({firebase}) => ({
        auth: pathToJS(firebase, 'auth')
    })
)(wrappedPlayerInfo)

export default authConnected;
