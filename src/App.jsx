import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Services from './components/Services'; 
import Education from './components/Education'; 
import Footer from './components/Footer'; 
import WhatsAppButton from './components/WhatsAppButton';
import Chatbot from './components/Chatbox';


import { CursorProvider } from './context/CursorContext';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <CursorProvider>
      <div className="bg-gray-900">
        <Navbar />
        <main className="pt-5">
          <Home />
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
