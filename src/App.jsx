import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <CursorProvider>
      <CustomCursor />
      <div className="bg-gray-900">
        <Navbar />
        {/* ================================================== */}
        {/* THE FIX IS HERE: add pt-20 to the main element    */}
        {/* ================================================== */}
        <main className="pt-20">
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </CursorProvider>
  );
}

export default App;