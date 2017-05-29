import React, {Component} from 'react';
import { ListItem } from 'material-ui';
import PersonOutline from 'material-ui/svg-icons/social/person-outline';

export default class LeaderboardItem extends Component {
    render(){
        var {pos, name, points} = this.props;
        return (
            <ListItem leftIcon={<PersonOutline/>}
                primaryText={
                <p>{pos.toString() + ". " + name}</p>}
                secondaryText={"Points: " + points}>

            </ListItem>

        );
    }
}