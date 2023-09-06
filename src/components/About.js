import React from "react";
import chefjames from "./img/chefjames.jpg";


const About = () => {
  return (
    <section className="flex justify-center">  
      <div className="h-min w-[600px] md:w-[800px] mt-12 mb-12 text-md text-center rounded overflow-hidden shadow-md bg-white text-stone-800">
        <div className="w-full max-w-screen-xl mx-auto p-6">
          <img className="border-stone-900 border-1 rounded object-cover w-full h-[200px]" loading="lazy"  src={chefjames} alt="chefjames"/> 
          <hr className="my-6 border-gray-200 mx-auto"/>
          <p className="my-6">
            Embark on a delectable journey with me, as I draw upon a decade of culinary expertise. 
            From bustling kitchens to serene farms, I've soaked in a world of flavors, scents, and visual delights. 
            These encounters have inspired my unique recipes, each dish a harmonious blend of tradition and creativity. 
            On this site, I'm thrilled to share a tapestry of tastes that reflect the sum of my culinary adventures. 
            Join me and savor the fruits of a decade's worth of passion and exploration.
          </p> 
        </div>
      </div>
    </section>
  );
};
  
export default About

