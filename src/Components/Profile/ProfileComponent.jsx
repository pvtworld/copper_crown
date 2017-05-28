import React from 'react';
import {connect} from 'react-redux';
import {firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import './ProfileComponent.css';
import {Button, Image, Modal} from 'react-bootstrap';
import {resetModal} from '../../Redux/Actions/navigationActions';

class ProfileComponent extends React.Component {

    componentWillMount() {
        this.setState({name: this.props.userInfo.username})
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const newUserInfo = {...this.props.userInfo};
        newUserInfo.username =  this.state.name

        this.props.dispatch({type: 'CHANGING_USERNAME'})
        this.props.firebase.set(`users/${this.props.uid}`, {...newUserInfo})
            .then(() => {
                this.props.dispatch({type: 'CHANGED_USERNAME'})
                return Promise.resolve();
            })


    }

    handleChange = (event) => {
        this.setState({name: event.target.value});
    }

    render() {

        return (

            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Profile Component</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h1>My account</h1>
                        <h4>Logged in as: {this.props.auth.displayName} </h4>

                        <h5><form onSubmit={this.handleSubmit}>
                            <label>
                                Username:
                                <input type="text" value={this.state.name}
                                       onChange={this.handleChange}/>
                            </label>
                            <input type="submit" value="Change"/>
                        </form></h5>
                        <h5>User ID: {this.props.auth.uid}</h5>
                        <Image id="picture" src={this.props.auth.photoURL} circle/>
                        <h5>Mail: {this.props.auth.email}</h5>
                        <h5>Points: {this.props.userInfo.points}</h5>
                        <h5>Number of roofs
                            taken: {this.props.userInfo.roofsStolen ? this.props.userInfo.roofsStolen : '0'}</h5>
                        <h5>Area of roofs
                            taken: {this.props.userInfo.areaOfCopper}</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary"
                                onClick={() => this.props.dispatch(resetModal())}>OK</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        )
    }
}


const mapStateToProps = ({firebase}, {auth}) => ({
    userInfo: auth ? dataToJS(firebase, `users/${auth.uid}`) : undefined,
    uid: auth ? auth.uid : undefined,
})

const propsConnected = connect(mapStateToProps)(ProfileComponent)

const wrappedPlayerInfo = firebaseConnect(
    ({auth}) => ([auth ? (`users/${auth.uid}`) : ('/')]))(propsConnected);

const authConnected = connect(
    ({firebase}) => ({
        auth: pathToJS(firebase, 'auth')
    })
)(wrappedPlayerInfo)

export default authConnected
