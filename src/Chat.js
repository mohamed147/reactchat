// 
import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';

// const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Remplacez par votre clé API OpenAI
const OPENAI_API_KEY = ''; // Remplacez par votre clé API OpenAI

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    // Envoi de la requête à l'API OpenAI
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci/completions',
      {
        prompt: `User: ${input}\nAI:`,
        max_tokens: 50,
        temperature: 0.7,
        n: 1,
        stop: '\n',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Ajout de la réponse générée aux messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, isUser: true },
      { text: response.data.choices[0].text.trim(), isUser: false },
    ]);

    setInput('');
  };

  return (
    <div>
      <h1>Chat</h1>

      <div>
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>

      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
