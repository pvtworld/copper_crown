import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, dataToJS} from 'react-redux-firebase';
import { Button, Modal } from 'react-bootstrap';
import { resetModal } from '../../Redux/Actions/navigationActions';
import DeadlineClock from '../DeadlineClock/DeadlineClock'
import LinearProgress from 'material-ui/LinearProgress';
import './GameStatistics.css';

var allRoofs = 11907;
class GameStatisticsComponent extends React.Component {

      constructor(props) {
    super(props);

    this.state = {
        completed: 100
    };
  }

    componentDidMount() {
    this.timer = setTimeout(() => this.progress(this.percentOfRoofsLeft(this.props)),0);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed < 0) {
      this.setState({completed: 0});
    } else {
      this.setState({completed});
      this.timer = setTimeout(() => this.progress(this.percentOfRoofsLeft(this.props)),1000);
    }
  } 

  

    numOfRoofsLeft = (props) =>{
        console.log("Detta är props1: " + props)
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
    console.log("Detta är props2: " + this.props);
    return (
        <div className="static-modal">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Game statistics</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h5>Game session ends in: </h5>
                    <DeadlineClock/>
                    <br></br>
                    <h5>Total number of roofs: {allRoofs}</h5>
                    <h5>Number of roofs left: {this.numOfRoofsLeft(this.props)}</h5>
                    <h5>Percent of roofs left: {this.percentOfRoofsLeft(this.props).toFixed(1) + "%"}</h5>
                    <br></br>
                    <h5>Current number of players: {this.numOfPlayers(this.props)}</h5>
                    <h5>Current copper price: {this.countDailyCopperPrice(this.props).toFixed(2) + " kr/sqm"}</h5>
                    <br></br>
                    <p id="leftp">Roofs remaining: {this.numOfRoofsLeft(this.props)}</p><p id="rightp">Roofs taken:{allRoofs-this.numOfRoofsLeft(this.props)}</p>
                    <LinearProgress mode="determinate" value={this.state.completed} />
                    <br></br>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={() => this.props.dispatch(resetModal())}>OK</Button>
                </Modal.Footer>

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
