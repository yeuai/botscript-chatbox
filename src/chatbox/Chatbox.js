import './Chatbox.scss';

function Chatbox() {
  return (
    <div id="botscript-chatbox">
      <div id="chat-circle" className="btn btn-raised">
        <div id="chat-overlay"></div>
        <i className="material-icons">speaker_phone</i>
      </div>

      <div className="chat-box">
        <div className="chat-box-header">
          ChatBox
        <span className="chat-box-toggle"><i className="material-icons">close</i></span>
        </div>
        <div className="chat-box-body">
          <div className="chat-box-overlay">
          </div>
          <div className="chat-logs">

          </div>
        </div>
        <div className="chat-input">
          <form>
            <input type="text" id="chat-input" placeholder="Send a message..." />
            <button type="submit" className="chat-submit" id="chat-submit"><i className="material-icons">send</i></button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Chatbox;
