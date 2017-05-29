import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import { Modal } from 'react-bootstrap';
import { IconButton } from 'material-ui';
import {red500, red900} from 'material-ui/styles/colors';
import Close from 'material-ui/svg-icons/navigation/close';
import { resetModal } from '../../Redux/Actions/navigationActions';
import DeadlineClock from '../DeadlineClock/DeadlineClock'
import LinearProgress from 'material-ui/LinearProgress';
import './GameStatistics.css';

const allRoofs = 11907;
class GameStatisticsComponent extends React.Component {

      constructor(props) {
    super(props);

    this.state = {
        completed: 100
    };
  }

    componentDidMount() {
        this.setState({completed: this.percentOfRoofsLeft(this.props)});
    //this.timer = setTimeout(() => this.setState({completed: 60}); //this.progress(60),0);
    
  }

 /* componentWillUnmount() {
    clearTimeout(this.timer);
 }/*

  /*progress(completed) {
    if (completed < 0) {
      this.setState({completed: 0});
    } else {
      this.setState({completed});
      //this.timer = setTimeout(() => this.progress(11800),1000);
    }
  } */

  

    numOfRoofsLeft = (props) =>{
        var roofArray = props.stolenRoofs ? Object.keys(props.stolenRoofs): [];
        var roofsStolen = roofArray.length; 

        return(
        allRoofs-roofsStolen
        )
    }

    percentOfRoofsLeft = (props) =>{
        return(
            (this.numOfRoofsLeft(props)/allRoofs)*100
        )
    }

    numOfPlayers = (props) =>{
        var playerArray = props.users? Object.keys(props.users): [];
        return(playerArray.length
        )
    }

    countDailyCopperPrice = (props) =>{
        var squareMeterPrice = props.copperPrice ? props.copperPrice : 0;
        var multiplier = props.copperMultiplier ? props.copperMultiplier : 0;
        return(squareMeterPrice * multiplier)
    } 

render(){
    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                     <div className="floating-right">
                        <IconButton onClick={() => this.props.dispatch(resetModal())}>
                            <Close color={red500}
                                   hoverColor={red900}/>
                        </IconButton>
                        </div>
                    <Modal.Title>Game statistics</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Game session ends in: </h5>
                    <DeadlineClock/>
                    <br></br>
                    <h5>Total number of roofs:<span style={{color: '#6f6f6f', fontWeight: '450'}}> {allRoofs}</span></h5>
                    <h5>Number of roofs left:<span style={{color: '#6f6f6f', fontWeight: '450'}}> {this.numOfRoofsLeft(this.props)}</span></h5>
                    <h5>Percent of roofs left:<span style={{color: '#6f6f6f', fontWeight: '450'}}> {this.percentOfRoofsLeft(this.props).toFixed(1) + "%"}</span></h5>
                    <br></br>
                    <h5>Current number of players:<span style={{color: '#6f6f6f', fontWeight: '450'}}> {this.numOfPlayers(this.props)}</span></h5>
                    <h5>Current copper price:<span style={{color: '#6f6f6f', fontWeight: '450'}}> {this.countDailyCopperPrice(this.props).toFixed(2) + " kr/sqm"}</span></h5>
                    <br></br>
                    <p id="leftp">Roofs remaining: {this.numOfRoofsLeft(this.props)}</p><p id="rightp">Roofs taken: {allRoofs-this.numOfRoofsLeft(this.props)}</p>
                    <LinearProgress id="progressbar" mode="determinate" color={"#2CA484"} value={this.state.completed} />
                    <br></br>
                </Modal.Body>

            </Modal.Dialog>
        </div>
    );}
}


var wrappedUserInfo = firebaseConnect(
    ['/users', '/stolenRoofs']
)(GameStatisticsComponent);

const mapStateToProps = (state) => {
    return {
    users: dataToJS(state.firebase, 'users'),
    stolenRoofs: dataToJS(state.firebase, 'stolenRoofs'),
    auth: pathToJS(state.firebase, 'auth'),
    copperPrice: state.copperPrice.price,
    copperMultiplier: state.copperMultiplier.multiplier

}};

export default connect(mapStateToProps)(wrappedUserInfo);
