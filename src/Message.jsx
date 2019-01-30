import React, {Component} from 'react';


class Message extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let {content, username, color} = this.props;
      return (
        <div className="message-content">
            <span className="message-username" style={{color: color}}>{username}</span>
            <span className="message-content">{content}</span>
        </div>
      )
    }
}

export default Message;