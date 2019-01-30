import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    
    render() {
        const Messages = this.props.messages.map((message) => {
            if (message.type === 'incomingMessage') {
            return <Message key={message.id} username={message.username} content={message.content} color={message.userColor}/>
                } else {
            return <div className="message system" key={message.id}>{message.content}</div>
                }
        });
      return (
        <div id="message">
            {Messages}
        </div>
      )
    }
}

export default MessageList;