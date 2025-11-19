import React, { useState } from "react";
import { motion } from "framer-motion";
import foodTL from "./img/food-tl.png";
import foodTR from "./img/food-tr.png";
import RecipeCard from "./RecipeCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { debounce } from "../utils/debounce";

const Home = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const recipesPerPage = 12;

  const fetchRecipes = async (endpoint) => {
    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err.message);
      return [];
    }
  };


  const handleSubmit = async (e, overrideQuery) => {
    if (e?.preventDefault) e.preventDefault();

    const q = overrideQuery ?? query;
    if (!q.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    setCurrentPage(1);

    const data = await fetchRecipes(`/api/search?query=${encodeURIComponent(q)}`);
    setRecipes(data);

    setTimeout(() => setIsLoading(false), 200);
  };

  const handleInputChange = debounce(async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const data = await fetchRecipes(`/api/search?query=${encodeURIComponent(value)}`);
      setSuggestions(data.slice(0, 5).map((r) => r.name));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, 300);

  const handleTagClick = async (tag) => {
    setHasSearched(true);
    setIsLoading(true);
    setCurrentPage(1);

    const data = await fetchRecipes(`/api/search?tag=${encodeURIComponent(tag)}`);
    setRecipes(data);

    setTimeout(() => setIsLoading(false), 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSubmit(null, suggestion);
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const slideFromTopLeft = {
    initial: { x: -200, y: -200, opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1, transition: { duration: 0.3 } },
  };
  const slideFromTopRight = {
    initial: { x: 200, y: -200, opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <motion.main>
      {/* HERO IMAGES */}
      <div id="hero" className="flex justify-between -z-10">
        <motion.img src={foodTL} alt="foodL" className="absolute -left-0 top-12 object-contain w-1/3 md:max-w-sm -z-10"
          loading="lazy" variants={slideFromTopLeft} initial="initial" animate="animate" />
        <motion.img src={foodTR} alt="foodR" className="absolute -right-0 top-6 object-contain w-1/3 md:max-w-sm -z-10"
          loading="lazy" variants={slideFromTopRight} initial="initial" animate="animate" />
      </div>

      {/* QUERY HEADING */}
      <div className="flex justify-around sm:mt-16 mt-32 mb-6 text-stone-800">
        <h2 className="text-2xl font-semibold">What are you craving?</h2>
      </div>

      {/* SEARCH BAR */}
      <motion.form variants={fadeIn} initial="initial" animate="animate"
        className="flex lg:w-2/5 w-3/4 items-center px-4 mb-12 mx-auto relative text-black"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <input
            className="w-full border-2 border-stone-900 bg-white pr-10 rounded-lg text-md"
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(null, query)}
          />

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg z-10">
              {suggestions.map((s, i) => (
                <li key={i}
                  className="px-4 py-2 hover:bg-stone-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.form>

      {/* RESULTS */}
      {currentRecipes.length > 0 ? (
        <motion.div className="grid grid-cols-1 max-md:w-full w-fit gap-8 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden" animate="show"
        >
          {currentRecipes.map((recipe, i) => (
            <RecipeCard key={recipe.id || i} recipe={recipe} />
          ))}
        </motion.div>
      ) : hasSearched && !isLoading ? (
        <motion.div variants={fadeIn} initial="initial" animate="animate" className="text-center mt-8 mb-12">
          <h3 className="text-lg italic text-stone-700">No recipes found. Try another search!</h3>
        </motion.div>
      ) : null}

      {/* PAGINATION */}
      {recipes.length > recipesPerPage && (
        <div className="flex justify-center gap-8 mt-12">
          <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
            <FaArrowLeft className="text-xl" />
          </button>
          <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === totalPages}>
            <FaArrowRight className="text-xl" />
          </button>
        </div>
      )}

      {/* TAG SEARCH */}
      <motion.div variants={fadeIn} initial="initial" animate="animate" className="flex justify-around mt-12">
        <h2 className="text-2xl font-semibold text-stone-800">
          Or browse by&nbsp;<span className="tag hover:bg-rose-500">TAG</span>?
        </h2>
      </motion.div>

      <motion.div className="flex flex-wrap gap-2 justify-center pt-6 pb-16"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } } }}
        initial="hidden" animate="show"
      >
        {["Chicken", "Dairy", "Beef", "Pork", "Turkey", "Soy", "Seafood", "Vegetable", "Baking", "Dessert"].map((tag) => (
          <motion.button
            key={tag}
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
