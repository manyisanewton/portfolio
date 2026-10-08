import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext';
import { ToastProvider } from './components/ui';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import FocusAreas from './components/FocusAreas';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Chatbox from './components/Chatbox';
import ProjectDetail from './components/ProjectDetail';
import './App.css';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CursorProvider>
      <ToastProvider>
        <Router>
          <div className="relative bg-base min-h-screen">
            <Navbar />
            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Home />
                      <About />
                      <FocusAreas />
                      <Skills />
                      <Projects />
                      <Experience />
                      <Contact />
                    </>
                  }
                />
                <Route path="/project/:slug" element={<ProjectDetail />} />
                <Route
                  path="*"
                  element={
                    <>
                      <Home />
                      <About />
                      <FocusAreas />
                      <Skills />
                      <Projects />
                      <Experience />
                      <Contact />
                    </>
                  }
                />
              </Routes>
            </main>
            <Footer />
            <WhatsAppButton isChatOpen={isChatOpen} />
            <Chatbox isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          </div>
        </Router>
      </ToastProvider>
    </CursorProvider>
  );
}

export default App;
