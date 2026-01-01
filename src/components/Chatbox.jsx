// src/components/Chatbot.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useCursor } from '../context/CursorContext';

const Chatbot = ({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }) => {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? uncontrolledIsOpen;
  const setIsOpen = controlledSetIsOpen ?? setUncontrolledIsOpen;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);
  const { setCursorVariant } = useCursor();

  useEffect(() => {
    setSessionId(uuidv4());
    setMessages([{ text: "Hello! I'm Newton's digital assistant. How can I help you today?", sender: 'bot' }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (text) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/dialogflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage, sessionId: sessionId }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const data = await res.json();
      setMessages(prev => [...prev, { text: data.text, sender: 'bot', suggestions: data.suggestions }]);
    } catch (error) {
      console.error('Failed to get bot response:', error);
      setMessages(prev => [...prev, { text: 'Sorry, I\'m having trouble connecting. Please try again later.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => handleSendMessage(suggestion);
  
  const handleMouseEnter = () => setCursorVariant('link');
  const handleMouseLeave = () => setCursorVariant('default');

  return (
    <>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl"
          initial={{ opacity: 0, x: 24, boxShadow: '0 0 0 rgba(6,182,212,0)' }}
          animate={{ opacity: 1, x: 0, boxShadow: '0 0 24px rgba(6,182,212,0.6)', rotate: [0, 0, -2, 2, 0], y: [0, 0, -2, 0, 0] }}
          transition={{ type: 'tween', duration: 0.6, ease: 'easeInOut', repeat: 6, repeatDelay: 4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label="Open chat"
        >
          <FiMessageSquare size={32} />
        </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 md:bottom-8 md:right-8 w-full h-full md:w-[360px] md:h-[520px] bg-gray-800 rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-700"
          >
            <header className="bg-gray-900 p-4 flex justify-between items-center text-white">
              <h3 className="text-xl font-bold">
                <span className="bg-cyan-600/20 text-cyan-200 px-3 py-1 rounded-full">Newton's Assistant</span>
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                aria-label="Close chat"
                title="Close"
              >
                <FiX size={20} />
              </button>
            </header>

            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'user' ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-200'}`}><p>{msg.text}</p></div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-lg p-3 flex space-x-2">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              {messages[messages.length - 1]?.sender === 'bot' && messages[messages.length - 1]?.suggestions?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-start">
                  {messages[messages.length - 1].suggestions.map((suggestion, i) => (
                    <motion.button key={i} onClick={() => handleSuggestionClick(suggestion)} className="bg-gray-700 text-cyan-300 text-sm px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-white transition-colors" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{suggestion}</motion.button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="p-4 bg-gray-900 flex items-center">
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Ask me anything..." className="w-full p-3 bg-gray-700 rounded-lg border-none focus:ring-2 focus:ring-cyan-400 focus:outline-none text-white" />
              <button type="submit" className="ml-3 p-3 bg-cyan-500 rounded-full text-white" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}><FiSend size={20} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
