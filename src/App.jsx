import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// const ws = new WebSocket('ws://localhost:3001');
// Generate a v1 (time-based) id
const uuidv1 = require('uuid/v1');
uuidv1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a' 
// Generate a v4 (random) id
const uuidv4 = require('uuid/v4');
uuidv4(); // -> '110ec58a-a0f2-4ac4-8393-c866d813b8d1' 




class App extends Component {
  constructor(props) {
    super(props);
  
  this.socket = new WebSocket('ws://localhost:3001');
  this.state = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
}
componentDidMount() {
  //console.log("componentDidMount <App />");
  this.socket.addEventListener('open', (event) => {
    console.log("Connected to the server");
  })
  this.socket.addEventListener('message', (message) => {
    let data = JSON.parse(message.data);
    console.log("data:", data);
    let messages = this.state.messages.concat(data);
    console.log(`recieved message from serve: ${message.data}`);
    this.setState({
      messages: messages
    });
  })
}

  handleNameChange = (event) => {
    let newName = event.target.value
    console.log(newName)
    this.setState({
      currentUser: { name: newName }
    })
  }

  
  addMessage = (messg) => {
    let message = {
      type: 'sendMessage',
      username: this.state.currentUser.name,
      content: messg,
      id: uuidv4()
    };
    
    let oldMessage = this.state.messages;
    let newMessage = [...oldMessage, message];
    this.socket.send(JSON.stringify(message));
    document.getElementById('message').value = ''
    // this.setState({
    //   messages: newMessage
    // })
  }
  
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} addMessages={this.addMessage} handleName={this.handleNameChange}/>
      </div>
    );
  }
}

export default App;
