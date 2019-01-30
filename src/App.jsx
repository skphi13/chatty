import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

speechSynthesis.getVoices()


class App extends Component {
	constructor(props) {
    super(props);
  
  this.socket = new WebSocket(`ws://${window.location.hostname}:3001`);
  this.state = {
			users: 0,
      currentUser: {name: "Anonymous"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
}

	handleNameChange = (event) => {
  	const newName = event.target.value;
  	const oldName = (this.state.currentUser.name) ? this.state.currentUser.name: 'Anonymous';
  	//if the name is not determined, it is temporarily "Anonymous"
  	if (event.key === "Enter"){
    	if (newName !== oldName){ // change the name only if the new name is different than the previous name
      	this.socket.send(JSON.stringify({
        	type: 'postNotification',
        	content: `${oldName} changed their name to ${newName}`
      	}))
      	this.setState({
        	currentUser: {name: newName}
      	})  
    	}
    
  	}
	}
	
	addMessage = (messg) => {
		let message = {
			type: 'postMessage',
			username: this.state.currentUser.name,
			content: messg,
		};
		let oldMessage = this.state.messages;
		let newMessage = [...oldMessage, message];
		this.socket.send(JSON.stringify(message));
		document.getElementById('message').value = ''
		}

	componentDidMount() {
		//console.log("componentDidMount <App />");
    this.socket.addEventListener('open', (event) => {
			console.log("Connected to the server");
    })
    this.socket.addEventListener('message', (message) => {
			const data = JSON.parse(message.data);
	
      switch(data.type) {
      //If the message is a user's message,
        case 'incomingMessage':
      // handle incoming message
          const receivedMessage = {
            type: 'incomingMessage',
            username: data.username,
            content: data.content,
						id: data.id,
						userColor: data.userColor
          }
          const allMessages = this.state.messages.push(receivedMessage)
          this.setState({
            message: allMessages
          })
          break;
      //If the message is a notification,
      //it attaches the content and converts it to an actual notification
        case 'incomingNotification':
          // handle incoming notification
          const receivedNotification = {
            type: 'incomingNotification',
            content: data.content,
						id: data.id,
            }
          const allNotifications = this.state.messages.concat(receivedNotification);
          this.setState({
            messages: allNotifications
          })
          break;
        case 'userNumber':
          this.setState({
						users: data.userNumber,
						userColor: data.userColor
					})
					break;
        default:
          // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + data.type);
      }
    })
	}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <div className= "userNumber">{this.state.users} users online</div>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessages={this.addMessage} handleName={this.handleNameChange}/>
      </div>
    );
  }
}

export default App;
