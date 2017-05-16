import React from 'react'
import './DeadlineClock.css'

export default class DeadlineClock extends React.Component{
    constructor() {
        super();
        this.state = {
            isMounted: false,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    }

    timer = null;

    componentWillMount(){
        this.startTimer()
    }

    componentDidMount(){
        this.timer = setInterval(() => this.startTimer(), 1000);
        this.setState({
            isMounted: true
        })
    }

    addZero(previousNumber){
        if(previousNumber < 10){
            return '0' + previousNumber;
        }else{
            return previousNumber;
        }
    }

    startTimer() {
        const gameFinishDate = "December 24, 2017 14:00:00"; //When game is ending
        let countDownFromDate = new Date(gameFinishDate).getTime();
        let remaining = countDownFromDate - new Date().getTime();

        let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        if(this.state.isMounted){
            this.setState({days, hours, minutes, seconds});
        }

        //Handle finished game
        if (remaining <= 1000) {
            clearInterval(this.timer);
            console.log('GAME ENDED')
        }
    }
    render(){
        return(
            <div className="center-text">
                <div className="days">Days: {this.addZero(this.state.days)} </div>
                <div className="hours">Hours: {this.addZero(this.state.hours)} </div>
                <div className="minutes">Minutes: {this.addZero(this.state.minutes)} </div>
                <div className="seconds">Seconds: {this.addZero(this.state.seconds)} </div>
            </div>

            )
    }
}