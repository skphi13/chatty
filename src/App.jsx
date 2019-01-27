import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// const ws = new WebSocket('ws://localhost:3001');




class App extends Component {
  constructor(props) {
    super(props);
  
  this.socket = new WebSocket('ws://localhost:3001');
  this.state = {
    currentUser: {name: "Bob"},// optional. if currentUser is not defined, it means the user is Anonymous
    messages: [
      {
        username: "Bob",
        content: "Has anyone seen my marbles?",
        id: 0
      },
      {
        username: "Anonymous",
        content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
        id: 1
      }
    ]
  }
}
componentDidMount() {
  //console.log("componentDidMount <App />");
  this.socket.addEventListener('open', (event) => {
    console.log("Connected to the server");
  })
  setTimeout(() => {
    //console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  handleNameChange = (event) => {
    
    let newName = event.target.value

    console.log(newName)
    this.setState({
      currentUser: { name: newName }
    })
  }

  
  addMessage = (messg) => {
    console.log("prop", this.props);
    let message = {
      username: this.state.currentUser.name,
      content: messg
    };
    
    let oldMessage = this.state.messages;
    let newMessage = [...oldMessage, message];
    
    this.setState({
      messages: newMessage
    })
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
