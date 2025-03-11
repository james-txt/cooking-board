import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe }) => {
  const isLongTitle = recipe.name.length > 20;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="recipe-card bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/recipe/${recipe.id}`} className="block">
        <div className="relative">
          <img 
            src={recipe.picture} 
            alt={recipe.name} 
            className="w-full h-48 object-cover rounded-t"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2">
            <div className="flex flex-wrap gap-1">
              {recipe.tag && recipe.tag.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-xs font-medium bg-rose-500 text-white px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-2 bg-white rounded-b flex items-center">
          <h3 className={`text-stone-800 font-medium hover:text-rose-500 transition duration-300 line-clamp-2
            ${isLongTitle ? 'text-xs p-2' : 'md:text-base lg:text-lg'}`}
          >
            {recipe.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
};

export default RecipeCard;