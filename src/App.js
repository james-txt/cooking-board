import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Recipe from './components/Recipe';
import Footer from './components/Footer';
import Contact from './components/Contact';
import About from './components/About';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import Config from './components/Config';
import { Routes, Route } from 'react-router-dom';

const msalInstance = new PublicClientApplication(Config);

function App() {
  useEffect(() => {
    // Listen for token message from popup
    const handleMessage = (event) => {
      if (event.origin === window.location.origin) {
        // Handle the token here, e.g., store it in state or perform other actions
        console.log('Received token:', event.data);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <div className="App">
        <Helmet>
          {/* Your Helmet content */}
        </Helmet>
        <header>
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </MsalProvider>
  );
}

export default App;