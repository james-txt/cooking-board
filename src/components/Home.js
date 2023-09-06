<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import foodTL from './img/food-tl.png';
import foodTR from './img/food-tr.png';
import RecipeCard from "./RecipeCard";

const Home = () => {
  const [query, setQuery] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Search recipe on submit
    fetch(`https://searchcookingboard.azurewebsites.net/api/search?name=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  };

  const handleTagClick = (tag) => {
    // Make an API call using the selected tag
    fetch(`https://searchcategorycookingboard.azurewebsites.net/api/searchcategory?tag=${tag}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetch(`https://searchcookingboard.azurewebsites.net/api/search?name=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  }, [setRecipes, query]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <main>
      <div id="hero" className="flex justify-between z-0">
        <img src={foodTL} alt="foodL" className="absolute -left-0 top-12 object-contain w-1/3 md:max-w-sm flex -z-10" loading="lazy" />
        <img src={foodTR} alt="foodR" className="absolute -right-0 top-6 object-contain w-1/3 md:max-w-sm flex -z-10" loading="lazy" />
      </div>
      <div className="flex flex-nowrap justify-around text-stone-800 sm:mt-16 mt-32 mb-6">
        <h2 className="flex items-center text-2xl font-semibold">What are you craving?</h2>
      </div>

      {/* Search bar */}
      
      <form id="searchbar" className="flex lg:w-2/5 w-3/4 md:w-1/2 items-center px-4 mb-12 relative mx-auto text-black" onSubmit={handleSubmit}>
        <input
          className="w-full border-2 border-stone-900 bg-white pr-10 rounded-lg text-md"
          type="text"
          name="search"
          placeholder="Search recipes.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-0 items-center mr-4">
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
      </form>

      {/* Recipe collection */}

      <div id="recipe-grid" className="grid grid-cols-1 w-fit gap-8 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {currentRecipes.length > 0 ? currentRecipes.map((recipe, i) => <RecipeCard recipe={recipe} key={i} />) : ""}
      </div>

      {/* Pagination buttons */}

      {recipes.length > recipesPerPage && (
        <div className="flex justify-evenly font-medium text-xln-stone-800 mt-12">
          <button
            className=""
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className=""
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Tag collection */}

      <div id="tags" className="flex flex-nowrap justify-around mt-12">
        <h2 className="flex place-items-center text-2xl font-semibold text-stone-800">Or browse by&nbsp;<span className="tag hover:bg-rose-500">TAG</span>?</h2>
      </div>

      <div id="tag-btn" className="flex flex-wrap flex-grow-0 gap-2 place-content-center md:mx-24 lg:mx-64 xl:mx-96 pt-6 px-4 pb-16">
        <button className="tag" onClick={() => handleTagClick("Chicken")}>CHICKEN</button>
        <button className="tag" onClick={() => handleTagClick("Dairy")}>DAIRY</button>
        <button className="tag" onClick={() => handleTagClick("Beef")}>BEEF</button>
        <button className="tag" onClick={() => handleTagClick("Pork")}>PORK</button>
        <button className="tag" onClick={() => handleTagClick("Turkey")}>TURKEY</button>
        <button className="tag" onClick={() => handleTagClick("Soy")}>SOY</button>
        <button className="tag" onClick={() => handleTagClick("Seafood")}>SEAFOOD</button>
        <button className="tag" onClick={() => handleTagClick("Vegetable")}>VEGETABLE</button>
        <button className="tag" onClick={() => handleTagClick("Baking")}>BAKING</button>
        <button className="tag" onClick={() => handleTagClick("Dessert")}>DESSERT</button>
      </div>
    </main>
  );
};

export default Home;
=======
import React, { useState, useEffect } from "react";
import foodTL from './img/food-tl.png';
import foodTR from './img/food-tr.png';
import RecipeCard from "./RecipeCard";

const Home = () => {
  const [query, setQuery] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Search recipe on submit
    fetch(`https://searchcookingboard.azurewebsites.net/api/search?name=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  };

  const handleTagClick = (tag) => {
    // Make an API call using the selected tag
    fetch(`https://searchcategorycookingboard.azurewebsites.net/api/searchcategory?tag=${tag}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetch(`https://searchcookingboard.azurewebsites.net/api/search?name=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  }, [setRecipes, query]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <main>
      <div id="hero" className="flex justify-between z-0">
        <img src={foodTL} alt="foodL" className="absolute -left-0 top-12 object-contain w-1/3 md:max-w-sm flex -z-10" loading="lazy" />
        <img src={foodTR} alt="foodR" className="absolute -right-0 top-6 object-contain w-1/3 md:max-w-sm flex -z-10" loading="lazy" />
      </div>
      <div className="flex flex-nowrap justify-around text-stone-800 sm:mt-16 mt-32 mb-6">
        <h2 className="flex items-center text-2xl font-semibold">What are you craving?</h2>
      </div>

      {/* Search bar */}
      
      <form id="searchbar" className="flex lg:w-2/5 w-3/4 md:w-1/2 items-center px-4 mb-12 relative mx-auto text-black" onSubmit={handleSubmit}>
        <input
          className="w-full border-2 border-stone-900 bg-white pr-10 rounded-lg text-md"
          type="text"
          name="search"
          placeholder="Search recipes.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-0 items-center mr-4">
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
      </form>

      {/* Recipe collection */}

      <div id="recipe-grid" className="grid grid-cols-1 w-fit gap-8 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {currentRecipes.length > 0 ? currentRecipes.map((recipe, i) => <RecipeCard recipe={recipe} key={i} />) : ""}
      </div>

      {/* Pagination buttons */}

      {recipes.length > recipesPerPage && (
        <div className="flex justify-evenly font-medium text-xln-stone-800 mt-12">
          <button
            className=""
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className=""
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Tag collection */}

      <div id="tags" className="flex flex-nowrap justify-around mt-12">
        <h2 className="flex place-items-center text-2xl font-semibold text-stone-800">Or browse by&nbsp;<span className="tag hover:bg-rose-500">TAG</span>?</h2>
      </div>

      <div id="tag-btn" className="flex flex-wrap flex-grow-0 gap-2 place-content-center md:mx-24 lg:mx-64 xl:mx-96 pt-6 px-4 pb-16">
        <button className="tag" onClick={() => handleTagClick("Chicken")}>CHICKEN</button>
        <button className="tag" onClick={() => handleTagClick("Dairy")}>DAIRY</button>
        <button className="tag" onClick={() => handleTagClick("Beef")}>BEEF</button>
        <button className="tag" onClick={() => handleTagClick("Pork")}>PORK</button>
        <button className="tag" onClick={() => handleTagClick("Turkey")}>TURKEY</button>
        <button className="tag" onClick={() => handleTagClick("Soy")}>SOY</button>
        <button className="tag" onClick={() => handleTagClick("Seafood")}>SEAFOOD</button>
        <button className="tag" onClick={() => handleTagClick("Vegetable")}>VEGETABLE</button>
        <button className="tag" onClick={() => handleTagClick("Baking")}>BAKING</button>
        <button className="tag" onClick={() => handleTagClick("Dessert")}>DESSERT</button>
      </div>
    </main>
  );
};

export default Home;
>>>>>>> 7b17c0b9019b76ccfe9c3cf0c2737ee46c853661
=======
import React, { useState, useEffect } from "react";
import foodTL from './img/food-tl.png';
import foodTR from './img/food-tr.png';
import RecipeCard from "./RecipeCard";

const Home = () => {
  const [query, setQuery] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 12;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Search recipe on submit
    fetch(`https://searchcookingboard.azurewebsites.net/api/search?name=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  };

  const handleTagClick = (tag) => {
    // Make an API call using the selected tag
    fetch(`https://searchcategorycookingboard.azurewebsites.net/api/searchcategory?tag=${tag}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetch(`https://searchcookingboard.azurewebsites.net/api/search?name=${query}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.log(error.message));
  }, [setRecipes, query]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <main>
      <div id="hero" className="flex justify-between z-0">
        <img src={foodTL} alt="foodL" className="absolute -left-0 top-12 object-contain w-1/3 md:max-w-sm flex -z-10" loading="lazy" />
        <img src={foodTR} alt="foodR" className="absolute -right-0 top-6 object-contain w-1/3 md:max-w-sm flex -z-10" loading="lazy" />
      </div>
      <div className="flex flex-nowrap justify-around text-stone-800 sm:mt-16 mt-32 mb-6">
        <h2 className="flex items-center text-2xl font-semibold">What are you craving?</h2>
      </div>

      {/* Search bar */}
      
      <form id="searchbar" className="flex lg:w-2/5 w-3/4 md:w-1/2 items-center px-4 mb-12 relative mx-auto text-black" onSubmit={handleSubmit}>
        <input
          className="w-full border-2 border-stone-900 bg-white pr-10 rounded-lg text-md"
          type="text"
          name="search"
          placeholder="Search recipes.."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-0 items-center mr-4">
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
      </form>

      {/* Recipe collection */}

      <div id="recipe-grid" className="grid grid-cols-1 w-fit gap-8 mx-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {currentRecipes.length > 0 ? currentRecipes.map((recipe, i) => <RecipeCard recipe={recipe} key={i} />) : ""}
      </div>

      {/* Pagination buttons */}

      {recipes.length > recipesPerPage && (
        <div className="flex justify-evenly font-medium text-xln-stone-800 mt-12">
          <button
            className=""
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className=""
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Tag collection */}

      <div id="tags" className="flex flex-nowrap justify-around mt-12">
        <h2 className="flex place-items-center text-2xl font-semibold text-stone-800">Or browse by&nbsp;<span className="tag hover:bg-rose-500">TAG</span>?</h2>
      </div>

      <div id="tag-btn" className="flex flex-wrap flex-grow-0 gap-2 place-content-center md:mx-24 lg:mx-64 xl:mx-96 pt-6 px-4 pb-16">
        <button className="tag" onClick={() => handleTagClick("Chicken")}>CHICKEN</button>
        <button className="tag" onClick={() => handleTagClick("Dairy")}>DAIRY</button>
        <button className="tag" onClick={() => handleTagClick("Beef")}>BEEF</button>
        <button className="tag" onClick={() => handleTagClick("Pork")}>PORK</button>
        <button className="tag" onClick={() => handleTagClick("Turkey")}>TURKEY</button>
        <button className="tag" onClick={() => handleTagClick("Soy")}>SOY</button>
        <button className="tag" onClick={() => handleTagClick("Seafood")}>SEAFOOD</button>
        <button className="tag" onClick={() => handleTagClick("Vegetable")}>VEGETABLE</button>
        <button className="tag" onClick={() => handleTagClick("Baking")}>BAKING</button>
        <button className="tag" onClick={() => handleTagClick("Dessert")}>DESSERT</button>
      </div>
    </main>
  );
};

export default Home;
>>>>>>> 7b17c0b9019b76ccfe9c3cf0c2737ee46c853661
