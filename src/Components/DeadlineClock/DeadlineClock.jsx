import React from 'react'
import './DeadlineClock.css'
import { connect } from 'react-redux'
import { addDays, addHours, addMinutes, addSeconds, resetTimer, showEndText, resetEndText } from '../../Redux/Actions/clockActions'


class DeadlineClock extends React.Component{
    constructor() {
        super();
        this.state = {
            showEndText: false,
            hours: 0,
            minutes: 0,
        }
    }

    timer = null;

    componentWillMount(){
        this.startTimer()
    }

    componentDidMount(){
        this.timer = setInterval(() => this.startTimer(), 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    addZero(previousNumber){
        if(previousNumber < 10){
            return '0' + previousNumber;
        } else {
            return previousNumber;
        }
    }

    startTimer() {
        const gameFinishDate = "May 16, 2017 19:59:10"; //When game is ending
        let countDownFromDate = new Date(gameFinishDate).getTime();
        let remaining = countDownFromDate - new Date().getTime();

        let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        this.props.dispatch(addDays(days));
        this.props.dispatch(addHours(hours));
        this.props.dispatch(addMinutes(minutes));
        this.props.dispatch(addSeconds(seconds));
        this.props.dispatch(resetEndText());

        //Handle finished game
        if (remaining <= 1000) {
            clearInterval(this.timer);
            this.props.dispatch(resetTimer());
            this.props.dispatch(showEndText());
        }
    }
    render(){
        return(
            <div className="center-text">
                <div className="days">Days: {this.addZero(this.props.days)} </div>
                <div className="hours">Hours: {this.addZero(this.props.hours)} </div>
                <div className="minutes">Minutes: {this.addZero(this.props.minutes)} </div>
                <div className="seconds">Seconds: {this.addZero(this.props.seconds)} </div>
                <p>{this.props.showEndText ? 'CURRENT GAME SESSION HAS ENDED!' : ''}</p>
            </div>

            )
    }
}

const mapStateToProps = (state) => {
    return {
        days: state.deadlineClock.days,
        hours: state.deadlineClock.hours,
        minutes: state.deadlineClock.minutes,
        seconds: state.deadlineClock.seconds,
        showEndText: state.deadlineClock.showEndText
    }
}
export default connect(mapStateToProps)(DeadlineClock)