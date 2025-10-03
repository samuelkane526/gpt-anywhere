import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import { sendPrompt } from './bot.js';

const wss = new WebSocketServer({ port: 8080 });
const clients = new Map();

console.log("Starting server...");

wss.on('connection', ws => {
  const clientId = crypto.randomUUID();
  clients.set(clientId, ws);
  console.log(`Client ${clientId} connected!`);
  
  ws.on('message', async msg => {
    try {
      const parsed = JSON.parse(msg);
      const { prompt, convoId } = parsed;

      console.log(`Received from ${clientId}:`, parsed);

      if (!prompt || !convoId) {
        ws.send(JSON.stringify({ error: 'Missing prompt or convoId' }));
        return;
      }

      const response = await sendPrompt(prompt, convoId);

      ws.send(JSON.stringify({
        convoId,
        prompt,
        response
      }));

      console.log(`Sent response to ${clientId} for convo ${convoId}`);
    } catch (err) {
      console.error('Error handling message:', err);
      ws.send(JSON.stringify({ error: 'Invalid message format or internal error' }));
    }
  });

  ws.on('close', () => {
    console.log(`Client ${clientId} disconnected`);
    clients.delete(clientId);
  });

  ws.on('error', error => {
    console.log(`Error with client ${clientId}:`, error);
  });
});
