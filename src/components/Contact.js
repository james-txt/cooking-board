import React from "react";


const Contact = () => {
  return (
    <div className="flex justify-center">  
      <div className="h-min w-[480px] mt-24 mb-12 text-md text-center rounded overflow-hidden shadow-md bg-white text-stone-800">
          <div className="w-full max-w-screen-xl mx-auto p-6">
            <p>jameslo.txt@gmail.com</p> 
            <hr className="my-6 border-gray-200 mx-auto"/>
            <p className="my-6">Help keep the site running:</p> 
            <a className="tag my-6" href="https://www.patreon.com/bePatron?u=98980724">Become a Patron!</a>
            <p className="my-6"></p>
            <a className="tag my-6" href="https://www.paypal.me/pbnjamz">Paypal</a>
          </div>
      </div>
    </div>
  )
}
  
export default Contact

