import React from "react";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Recipe from "./components/Recipe";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";
import { inject } from '@vercel/analytics';
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    inject();
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" dir="ltr" />
        <meta charSet="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.6/flowbite.min.css" rel="stylesheet"/>
        <script src="https://alcdn.msauth.net/browser/2.17.0/js/msal-browser.js"></script>
        <title>Cooking Board</title>
      </Helmet>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
