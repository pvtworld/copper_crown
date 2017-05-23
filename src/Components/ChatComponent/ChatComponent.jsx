import React from 'react'
import ChatInputField from './ChatInputField'
import ChatHistory from "./ChatHistory";

export default class ChatComponent extends React.Component{
    render(){
        return (
            <div>
                <h1>ChatComponent</h1>
                <ChatHistory history={this.props.history}/>
                <ChatInputField userID={this.props.userID} sendMessage={this.props.sendMessage}/>
            </div>
        );
    }
}