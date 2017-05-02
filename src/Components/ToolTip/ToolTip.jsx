import React from 'react'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

export default class ToolTip extends React.Component{
    render(){
        let tooltip = <Tooltip id={this.props.id}>{this.props.tooltip}</Tooltip>;
        let placement = this.props.placement;
        let delayShow = this.props.delayShow;
        return (
            <OverlayTrigger
                overlay={tooltip} placement={placement}
                delayShow={delayShow} delayHide={150}
            >
                <a href={this.props.href}>{this.props.children}</a>
            </OverlayTrigger>
        )
    }
}