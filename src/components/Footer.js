import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="inset-x-0 bottom-0 text-stone-500">
        <div className="w-full max-w-screen-xl mx-auto p-6">
            <hr className="my-6 border-gray-200 mx-auto"/>
            <span className="block text-sm text-center">© 2023 Cooking Board™
            <Link to={`/contact`}>
            <a href="#" className="block text-sm hover:underline">Contact</a>
            </Link>
            </span> 
        </div>
    </footer>
  )
}

export default Footer
