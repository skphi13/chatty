import React, {Component} from 'react';


class Message extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let content = this.props.content;
        let {username, color} = this.props;
        let imgKey = Math.floor(Math.random() * 100000);
        
        // Returns img tags for imgurls
        const findImageUrl = (str) =>  {
            const urlMatch = str.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/ig);
            if (urlMatch == null) {
                return ' ' + str;
            } else {
                return <div key={imgKey}><img className="img" key={imgKey} src={urlMatch} /></div>
            }
        }
        
        // Renders image inside the content
        const renderImages = (content) => {
            content = content.split(' ').map((url) => {
                return findImageUrl(url);
            });
        return content;
        }
        
      return (
        <div className="message-content">
            <span className="message-username" style={{color: color}}>{username}</span>
            <span className="message-content">{renderImages(content)}</span>
        </div>
      )
    }
}

export default Message;