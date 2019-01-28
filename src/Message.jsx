import React, {Component} from 'react';


class Message extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {content, username} = this.props
      return (
        <div className="message-content">
            <span className="message-username">{username}</span>
            <span className="message-content">{content}</span>
        </div>
      )
    }
}

export default Message;