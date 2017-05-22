import React from 'react';
import { connect } from 'react-redux';
import { resetRoof } from '../../Redux/Actions/copperMapActions';
import Snackbar from 'material-ui/Snackbar'


class RoofNotFound extends React.Component{
    constructor(){
        super()
        this.state = {
            open: false
        }
        window.setTimeout(() => this.setState({open: true}), 1)
    }

    render(){
        return(
            <Snackbar
                open={this.state.open}
                message={'Roof not found'}
                action="Dismiss"
                autoHideDuration={3000}
                onActionTouchTap={() => {  
                    this.setState({open: false})
                    window.setTimeout(() => this.props.dispatch(resetRoof()), 600)
                    }}
                onRequestClose={() => {
                    this.setState({open: false})
                    window.setTimeout(() => this.props.dispatch(resetRoof()), 600)
                    }
                }
            />
        )
    }
}

export default connect()(RoofNotFound)


