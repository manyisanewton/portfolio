// src/components/Chatbox.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useCursor } from '../context/CursorContext';

const Chatbox = ({ isOpen: controlledIsOpen, setIsOpen: controlledSetIsOpen }) => {
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
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting. Please try again later or email me directly.", sender: 'bot' }]);
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
          className="fixed bottom-24 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{ background: 'var(--color-cyan)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, boxShadow: '0 0 30px var(--color-cyan-glow)', rotate: [0, 0, -2, 2, 0], y: [0, 0, -2, 0, 0] }}
          transition={{ type: 'tween', duration: 0.6, ease: 'easeInOut', repeat: 6, repeatDelay: 4 }}
          whileHover={{ scale: 1.15, boxShadow: '0 0 40px var(--color-cyan-glow)' }}
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
            className="fixed bottom-0 right-0 md:bottom-8 md:right-8 w-full h-full md:w-[380px] md:h-[560px] bg-white rounded-2xl shadow-xl flex flex-col z-50 overflow-hidden border"
            style={{ borderColor: 'var(--border-light)', boxShadow: 'var(--shadow-tilt)' }}
          >
            <header className="px-5 py-4 flex justify-between items-center" style={{ borderBottomColor: 'var(--border-light)', background: 'var(--bg-subtle)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl" style={{ background: 'var(--color-cyan-soft)' }}>
                  <FiMessageSquare className="h-5 w-5" style={{ color: 'var(--color-cyan)' }} />
                </div>
                <h3 className="font-display font-semibold text-lg" style={{ color: 'var(--fg-primary)' }}>
                  Newton's Assistant
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="p-2 rounded-xl hover:bg-slate-200 transition-colors"
                aria-label="Close chat"
              >
                <FiX size={20} style={{ color: 'var(--fg-tertiary)' }} />
              </button>
            </header>

            <div className="flex-1 p-5 overflow-y-auto" style={{ background: 'var(--bg-base)' }}>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`rounded-2xl p-4 max-w-[85%] ${msg.sender === 'user' ? 'text-white' : ''} relative`} style={{
                    background: msg.sender === 'user' ? 'var(--color-cyan)' : 'var(--bg-subtle)',
                    color: msg.sender === 'user' ? 'white' : 'var(--fg-primary)',
                  }}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    {msg.sender === 'bot' && (
                      <div className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full opacity-20" style={{ background: 'var(--color-cyan)' }} />
                    )}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-subtle rounded-2xl p-4 flex space-x-1.5" style={{ borderColor: 'var(--border-light)' }}>
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ background: 'var(--color-cyan)' }} />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }} className="w-2 h-2 rounded-full" style={{ background: 'var(--color-cyan)' }} />
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 rounded-full" style={{ background: 'var(--color-cyan)' }} />
                  </div>
                </div>
              )}
              {messages[messages.length - 1]?.sender === 'bot' && messages[messages.length - 1]?.suggestions?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-start">
                  {messages[messages.length - 1].suggestions.map((suggestion, i) => (
                    <motion.button
                      key={i}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
                      style={{
                        background: 'var(--bg-subtle)',
                        color: 'var(--fg-secondary)',
                        borderColor: 'var(--border-light)',
                      }}
                      whileHover={{
                        background: 'var(--color-cyan)',
                        color: 'white',
                        borderColor: 'var(--color-cyan)',
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="p-5" style={{ background: 'var(--bg-subtle)', borderTopColor: 'var(--border-light)' }}>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="input-field flex-1"
                  style={{ borderColor: 'var(--border-light)' }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="p-3 rounded-full text-white flex items-center justify-center"
                  style={{ background: 'var(--color-cyan)' }}
                  disabled={isLoading || !inputValue.trim()}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSend size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbox;
