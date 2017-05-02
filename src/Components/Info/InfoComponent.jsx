import React from 'react';

export default class InfoComponent extends React.Component{
    render(){
        const back = <button onClick={this.props.leaveInfo}>Back</button>;
        return(
            <div>
                <h1>Stockholm</h1>
                {back}
            </div>
        )
    }
}