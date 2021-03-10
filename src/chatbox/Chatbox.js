import { BotScript, Request } from "@yeuai/botscript";
import { Widget, addResponseMessage } from 'react-chat-widget';
import { useEffect } from "react";

import 'react-chat-widget/lib/styles.css';
import './Chatbox.scss';

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
  bot.parse(`
    /include:
      - https://raw.githubusercontent.com/yeuai/botscript/master/examples/definition.bot
      - https://raw.githubusercontent.com/yeuai/botscript/master/examples/basic.bot
      ${botId ? '- https://botscript.ai/api/kb/' + botId : ''}
    `);
    await bot.init();
}

function Chatbox(botId) {
  useEffect(() => {
    initBot();

  });
  return (
    <Widget handleNewUserMessage={handleNewUserMessage}
      subtitle='💬Funny chat with your bot🤖'
    />
  );
}

export default Chatbox;
