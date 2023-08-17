import React from "react";
import logo from './img/logo-sm1.png';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom'; // Import useHistory

function Navbar() {
  const { instance } = useMsal();
  const navigate = useNavigate(); // Initialize useHistory

  const handleSignIn = async () => {
    try {
      const response = await instance.loginPopup();
      // Handle successful login

      // Close the pop-up window
      window.close();

      // Send token to parent window
      if (window.opener) {
        window.opener.postMessage(response.accessToken, window.location.origin);
      }
      // Redirect to the homepage with the token
      navigate('/', { token: response.accessToken });
    } catch (error) {
      console.error('Login error:', error);
    }
  };


    return (
      <header className="sticky top-0 w-full z-auto">
        <nav className="flex justify-between bg-stone-700 shadow-md shadow-stone-900 py-1.5 rounded-b-md">
          <div id="logo" className="flex flex-shrink-0 items-center sm:ml-4 ml-2 z-0">
            <a href="/">
              <img src={logo} style={{ height: '50px', width: '52px' }} alt="Cooking Board Logo" loading="lazy" />
            </a>
            <span className="block text-stone-50 self-center sm:pl-4 pl-2 sm:text-4xl text-2xl font-medium whitespace-nowrap">COOKING BOARD</span>
          </div>
          <div className="flex right-0 md:mr-4 mr-2 items-center">
            <button id="login" onClick={handleSignIn} className="bg-stone-200 rounded-full focus:ring-2 focus:ring-stone-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
    );
  }

export default Navbar;