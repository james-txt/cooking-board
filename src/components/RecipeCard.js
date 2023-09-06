<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";


const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.picture} alt={recipe.name} />
      </Link>
      <div id="recipe-description" className="container md:h-1/2 h-fit w-full">
        <p className="hover:text-rose-500 text-stone-800 md:text-base lg:text-lg font-medium transition duration-300 ease-in-out break-words p-2">
          {recipe.name}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
=======
import React from "react";
import { Link } from "react-router-dom";


const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.picture} alt={recipe.name} />
      </Link>
      <div id="recipe-description" className="container md:h-1/2 h-fit w-full">
        <p className="hover:text-rose-500 text-stone-800 md:text-base lg:text-lg font-medium transition duration-300 ease-in-out break-words p-2">
          {recipe.name}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;
>>>>>>> 7b17c0b9019b76ccfe9c3cf0c2737ee46c853661
