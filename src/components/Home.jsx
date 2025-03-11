import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import foodTL from './img/food-tl.png';
import foodTR from './img/food-tr.png';
import RecipeCard from "./RecipeCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const recipesPerPage = 12;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setIsLoading(true);
    try {
      const response = await fetch(`https://searchcookingboard.azurewebsites.net/api/recipes?query=${query}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.log(error.message);
      setRecipes([]);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const handleTagClick = async (tag) => {
    setHasSearched(true);
    setIsLoading(true);
    try {
      const response = await fetch(`https://searchcookingboard.azurewebsites.net/api/recipes?tag=${tag}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.log(error.message);
      setRecipes([]);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      try {
        const response = await fetch(`https://searchcookingboard.azurewebsites.net/api/recipes?query=${value}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setSuggestions(data.slice(0, 5).map(recipe => recipe.name));
        setShowSuggestions(true);
      } catch (error) {
        console.log(error.message);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSubmit(new Event('submit'));
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const slideIn = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: "spring", stiffness: 100 }
  };

  const slideFromTopLeft = {
    initial: { x: -200, y: -200, opacity: 0 },
    animate: { 
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const slideFromTopRight = {
    initial: { x: 200, y: -200, opacity: 0 },
    animate: { 
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.main>
      <div id="hero" className="flex justify-between -z-10">
        <motion.img
          src={foodTL}
          alt="foodL"
          className="absolute -left-0 top-12 object-contain w-1/3 md:max-w-sm flex -z-10"
          loading="lazy"
          variants={slideFromTopLeft}
          initial="initial"
          animate="animate"
        />
        <motion.img
          src={foodTR}
          alt="foodR"
          className="absolute -right-0 top-6 object-contain w-1/3 md:max-w-sm flex -z-10"
          loading="lazy"
          variants={slideFromTopRight}
          initial="initial"
          animate="animate"
        />
      </div>

      <div className="flex flex-nowrap justify-around text-stone-800 sm:mt-16 mt-32 mb-6">
        <h2 className="flex items-center text-2xl font-semibold">What are you craving?</h2>
      </div>

      {/* Search bar */}
      <motion.form
        variants={fadeIn}
        initial="initial"
        animate="animate"
        id="searchbar"
        className="flex lg:w-2/5 w-3/4 md:w-1/2 items-center px-4 mb-12 relative mx-auto text-black"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <input
            className="w-full border-2 border-stone-900 bg-white pr-10 rounded-lg text-md"
            type="text"
            name="search"
            placeholder="Search recipes.."
            value={query}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          <button type="submit" className="absolute -right-0.5 bottom-3.5 items-center mr-1">
            <svg
              className="text-rose-500 h-4 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: 'new 0 0 56.966 56.966' }}
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
          
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-stone-200 rounded-lg mt-1 shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-stone-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.form>

      {/* Recipe collection with faster animations */}
      {currentRecipes.length > 0 ? (
        <motion.div
          variants={{
            show: {
              transition: {
                staggerChildren: 0.05
              }
            }
          }}
          initial="hidden"
          animate="show"
          id="recipe-grid"
          className="grid grid-cols-1 w-fit max-md:w-full gap-8 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
        >
          {currentRecipes.map((recipe, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.3
                  }
                }
              }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      ) : hasSearched && !isLoading ? (
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="text-center mt-8 mb-12"
        >
          <h3 className="text-lg italic text-stone-700">
            No recipes found. Try another search!
          </h3>
        </motion.div>
      ) : null}

      {/* Pagination buttons */}

      {recipes.length > recipesPerPage && (
        <div className="flex justify-center gap-8 mt-12">
          <button
            className="flex items-center gap-2 text-stone-800 hover:text-rose-500 disabled:text-stone-400"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <button
            className="flex items-center gap-2 text-stone-800 hover:text-rose-500 disabled:text-stone-400"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaArrowRight className="text-xl" />
          </button>
        </div>
      )}

      {/* Tag collection */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        id="tags"
        className="flex flex-nowrap justify-around mt-12"
      >
        <h2 className="flex place-items-center text-2xl font-semibold text-stone-800">
          Or browse by&nbsp;<span className="tag hover:bg-rose-500">TAG</span>?
        </h2>
      </motion.div>

      {/* Tag collection with slower animations */}
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.4
            }
          }
        }}
        initial="hidden"
        animate="show"
        id="tag-btn"
        className="flex flex-wrap flex-grow-0 gap-2 place-content-center md:mx-24 lg:mx-64 xl:mx-96 pt-6 px-4 pb-16"
      >
        {["Chicken", "Dairy", "Beef", "Pork", "Turkey", "Soy", "Seafood", "Vegetable", "Baking", "Dessert"].map((tag) => (
          <motion.button
            key={tag}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              show: { 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.2
                }
              }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="tag"
            onClick={() => handleTagClick(tag)}
          >
            {tag.toUpperCase()}
          </motion.button>
        ))}
      </motion.div>
    </motion.main>
  );
};

export default Home;