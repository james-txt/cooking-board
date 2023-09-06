import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="inset-x-0 bottom-0 text-stone-500">
        <div className="mx-auto p-6">
            <hr className="my-6 border-gray-200 mx-auto"/>
            <p className="text-sm text-center">© 2023 Cooking Board™
                <div class="flex flex-wrap gap-2 justify-center">
                    <Link to={`/about`} className="text-sm hover:underline">About</Link>
                    <Link to={`/contact`} className="text-sm hover:underline">Contact</Link>

                </div>
            </p> 
        </div>
    </footer>
  )
}

export default Footer
