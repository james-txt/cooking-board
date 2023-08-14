import React from "react";
import logo from './img/logo-sm1.png';


const Navbar = () => {
  return (
    <header className="sticky top-0 z-auto">
      <nav className="flex justify-between bg-stone-700 shadow-md shadow-stone-900 border-stone-500 py-1.5 rounded-b-md">
        <div id="logo" className="flex flex-shrink-0 items-center mx-4 z-0">
          <a href="/">
            <img src={logo} style={{ height: '50px', width: '52px' }} alt="Cooking Board Logo" loading="lazy" />
          </a>
          <span className="block text-stone-50 self-center mx-4 text-4xl font-medium whitespace-nowrap">COOKING BOARD</span>
        </div>
        <div className="flex right-0 items-center">
          <button id="login" className="mx-2 bg-stone-200 rounded-full focus:ring-2 focus:ring-stone-900">
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
          <button id="logout" className="hidden mx-2 bg-stone-200 rounded-full focus:ring-2 focus:ring-stone-900" />
          <button
            type="button"
            className="mx-2 text-sm bg-stone-200 rounded-full focus:ring-2 focus:ring-stone-900"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            {/* <img className="w-8 h-8 rounded-full" src="./img/user.jpg" alt="user photo"> */}
          </button>
      	</div>
   	 </nav>
  	</header>
	)
}

export default Navbar
