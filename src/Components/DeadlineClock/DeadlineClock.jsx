import React from 'react'

const gameFinishDate = "May 16, 2017 16:00:30";

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
        this.createTimer()
    }

    componentDidMount(){
        this.timer = setInterval(() => this.createTimer(), 1000)
        this.setState({
            isMounted: true
        })
    }

    createTimer() {
        let countDownFromDate = new Date(gameFinishDate).getTime(); //When timer should end
        let remaining = countDownFromDate - new Date().getTime();

        let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        if(this.state.isMounted){
            this.setState({days, hours, minutes, seconds});
        }
        
        if(remaining <= 1000){
            clearInterval(this.timer);
            console.log('FINISHED')
        }


    }
    render(){
        return <h1> Days: {this.state.days} Hours: {this.state.hours} Minutes: {this.state.minutes} Seconds: {this.state.seconds}</h1>;
    }
}