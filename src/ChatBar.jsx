import React, {Component} from 'react';

class ChatBar extends Component {
    messageEnter = (e) => {
        if (e.key === 'Enter') {
            this.props.addMessages(e.target.value);
        }
    // changeName = (e) => {
    //         this.props.newName(e.target.value);
    //     }
    }
    render() {
      return (
        <div>
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name} id="username" onChange={this.props.handleName}/>
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" id="new-message" onKeyPress={this.messageEnter}/>
            </footer>
        </div>
      )
    }
}

export default ChatBar;