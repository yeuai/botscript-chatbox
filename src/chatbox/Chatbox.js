import { BotScript, Request } from "@yeuai/botscript";
import { Widget, renderCustomComponent } from 'react-chat-widget';
import { useEffect, Component } from "react";
import parse from 'html-react-parser'

import 'react-chat-widget/lib/styles.css';
import './Chatbox.scss';

import logo from './avatar.svg';


const bot = new BotScript();
const request = new Request();

/**
 * Tùy chỉnh custom component
 */
class ReplyComponent extends Component {
  render() {
    let msg = this.props.reply.speechResponse;
    return <div>{parse(msg)}</div>
  }
}

/**
 * Handle message request
 * @param {string} msg
 */
async function handleNewUserMessage(msg) {
  const reply = await bot.handleAsync(request.enter(msg));
  renderCustomComponent(ReplyComponent, {reply}, true);
}

/**
 * Init botscript
 * Load/parse according to the following priority order
 * 1. From jsx tag <BotScript id={<id>} />
 * 2. From script tag:  <script async data-botid="p3PkBtuA" src="//chatbox.botscript.ai/embed.js">
 * 3. From url query: ?bot=1234&action=edit
 * @param {string} botId name of bot
 */
async function initBot(botId) {
  if (botId == null) {
    // Parse bot from other location
    // Ref: https://stackoverflow.com/a/22744637/1896897
    if (document.querySelector('script[data-botid]') != null) {
      botId = document.querySelector('script[data-botid]')?.getAttribute('data-botid');
    } else {
      // Trying to parse from url query.
      const urlParams = new URLSearchParams(window.location.search);
      botId = urlParams.get('bot');
    }
  }

  if (!botId) {
    botId = 'PKVip Test';
  }

  // Parse bot knowledge
  bot.parse(`
    /include:
      - https://raw.githubusercontent.com/yeuai/botscript/master/examples/definition.bot
      - https://raw.githubusercontent.com/yeuai/botscript/master/examples/basic.bot
      ${botId ? '- https://botscript.ai/api/kb/' + botId : ''}
    `);
  await bot.init();
}

function Chatbox() {
  useEffect(() => {
    initBot();
  });
  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      subtitle='💬Funny chat with your bot🤖'
      profileAvatar={logo}
    />
  );
}

export default Chatbox;
