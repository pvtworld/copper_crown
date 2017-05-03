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
                        <h3>Copper roofs are dope</h3>
                    </div>
                </div>
            )
        }
        return null;
    }
}