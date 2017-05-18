import React from 'react';
import { connect } from 'react-redux';
import { resetRoof } from '../../Redux/Actions/copperMapActions';
import Snackbar from 'material-ui/Snackbar'


class RoofNotFound extends React.Component{

    render(){
        return(
            <Snackbar
                open={true}
                message={'Roof not found'}
                action="Dismiss"
                autoHideDuration={3000}
            />
        )
    }
}

export default connect()(RoofNotFound)


