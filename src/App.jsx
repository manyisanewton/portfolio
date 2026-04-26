import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import SystemsMap from './components/SystemsMap';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import FloatingSignals from './components/FloatingSignals';
import Services from './components/Services'; 
import Education from './components/Education'; 
import Footer from './components/Footer'; 
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbox';
import './App.css';


import { CursorProvider } from './context/CursorContext';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <CursorProvider>
      <div className="relative bg-gray-900">
        <FloatingSignals />
        <Navbar />
        <main className="pt-5">
          <Home />
          <SystemsMap />
          <About />
          <Services /> 
          <Education /> 
          <Skills />
          <Projects />
          <Chatbot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          <Contact />
        </main>
        <Footer /> 
        <WhatsAppButton isChatOpen={isChatOpen} />
      </div>
    </CursorProvider>
  );
}

export default App;
