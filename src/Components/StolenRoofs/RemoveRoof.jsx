import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import {red500} from 'material-ui/styles/colors';

export default class RemoveRoof extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  removeRoof = (removeRoofCallback) => {
    this.setState({open: false});
    removeRoofCallback();
  }

  render() {
    const actions = [
      <FlatButton
        label="cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete Roof"
        secondary={true}
        onTouchTap={() => this.removeRoof(this.props.removeRoofCallback)}
      />,
    ];

    return (
     <div className="floating-right">
        <DeleteForever
          hoverColor={red500}
          onClick={this.handleOpen} />
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          This will remove the choosen roof, continue?
        </Dialog>
    </div>
    );
  }
}