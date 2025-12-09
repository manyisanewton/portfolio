import React from 'react';
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
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <div className="bg-gray-900">
        <Navbar />
        <main className="pt-5">
          <Home />
          <About />
          <Services /> 
          <Education /> 
          <Skills />
          <Projects />
          <Chatbot />
          <Contact />
        </main>
        <Footer /> 
        <WhatsAppButton />
      </div>
    </CursorProvider>
  );
}

export default App;