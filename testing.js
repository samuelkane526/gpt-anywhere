import { sendPrompt } from './bot.js';

(async () => {
  const response1 = await sendPrompt('What is the capital of France?', 'convo1');
  console.log('Response 1:', response1);

  const respons2 = await sendPrompt("Tell me a fun fact!", 'convo2');

  const response2 = await sendPrompt('Tell me a joke.', 'convo1');
  console.log('Response 2:', response2);

  const end = await sendPrompt('end conversation', 'convo1');
  console.log('Conversation ended:', end);
})();