import { BotScript, Request } from "@yeuai/botscript";
import { Widget, addResponseMessage } from 'react-chat-widget';
import { useEffect } from "react";

import 'react-chat-widget/lib/styles.css';
import './Chatbox.scss';

import logo from './avatar.svg';


const bot = new BotScript();
const request = new Request();

/**
 * Handle message request
 * @param {string} msg
 */
async function handleNewUserMessage(msg) {
  // await bot.init();
  const reply = await bot.handleAsync(request.enter(msg));
  addResponseMessage(reply.speechResponse);
}

async function initBot(botId) {
  // Ref: https://stackoverflow.com/a/22744637/1896897
  // Eg: <script async data-botid="p3PkBtuA" src="//chatbox.botscript.ai/embed.js">
  var me = document.querySelector('script[data-botid]');
  if (me != null) {
    botId = me.getAttribute('data-botid');
  }
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
    initBot('PKVip Test');
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
