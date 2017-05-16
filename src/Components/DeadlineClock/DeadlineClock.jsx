import React from 'react'

export default class DeadlineClock extends React.Component{

    componentDidMount(){
        let countDownFromDate = new Date("May 16, 2017 13:07:00").getTime(); //When timer should end
        let timeout = setInterval(countDownFunc, 1000);

        function countDownFunc() {
            let remaining = countDownFromDate - new Date().getTime();
            convertToDayFormat((Math.max(0, remaining)));
            if (remaining <= 0) {
                clearInterval(timeout);
                console.log('Timer finished!');
            }
        }
        function convertToDayFormat(remaining){
            let days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            let hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            console.log('Days: '+ days + '\nHours: ' + hours + '\nMinutes: ' + minutes + '\nSeconds: ' + seconds);
        }
    }

    render(){
        return <h1></h1>;
    }
}