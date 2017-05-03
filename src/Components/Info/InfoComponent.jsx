import React from 'react';
import './InfoComponent.css'
import {Button} from 'react-bootstrap'

export default class InfoComponent extends React.Component{
    render(){
        const back = <Button bsStyle="primary" onClick={this.props.leaveInfo}>Back</Button>;

        if(this.props.renderInfo){
            return(
                <div className="box">
                    {back}
                    <div>
                        <h3>Info</h3>
                        <p>Copper roofs are dope</p>
                    </div>
                </div>
            )
        }
        return null;
    }
}