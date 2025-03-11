import React, { useEffect, useState, startTransition } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://searchcookingboard.azurewebsites.net/api/recipes?id=${id}`);
        if (!response.ok) throw new Error('Recipe not found');
        const data = await response.json();
        
        // Check if data is an array and get the first item
        const recipeData = Array.isArray(data) ? data[0] : data;
        
        if (!recipeData) {
          throw new Error('No recipe data found');
        }

        startTransition(() => {
          setRecipe(recipeData);
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-rose-500">Loading recipe...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-rose-500">Error: {error}</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-rose-500">Recipe not found</div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center"
    >
      {recipe ? (
        <div className="rounded border-stone-200 border shadow-md bg-white w-full max-w-7xl mx-4 px-8 pt-8 my-12">
          <header>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/" className="text-rose-500 hover:text-rose-400">
                  <svg className="w-7 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 9">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                  </svg>
                </Link>
                <h1 className="text-3xl font-medium text-rose-500">
                  {recipe.name}
                </h1>
              </div>
              {recipe.tag && recipe.tag.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-end">
                  {recipe.tag.map((tag, index) => (
                    <span key={index} className="text-sm font-medium bg-rose-500 text-white px-3 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* Top section with image and ingredients side by side */}
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            {recipe.picture && (
              <div className="lg:w-1/2 flex-shrink-0">
                <img
                  className="rounded-lg shadow-lg w-full h-[400px] object-cover object-center"
                  src={recipe.picture}
                  alt={recipe.name}
                />
              </div>
            )}
            
            <div className="lg:w-1/2 flex-shrink-0">
              <section>
                <h2 className="text-2xl font-medium text-rose-500 mb-4">Ingredients</h2>
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                  <ul className="list-disc list-inside space-y-2">
                    {recipe.ingredients.map((item, index) => (
                      <li key={index} className="text-stone-800">{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            </div>
          </div>

          {/* Full width instructions section */}
          <section className="w-full pb-8">
            <h2 className="text-2xl font-medium text-rose-500 mb-4">Instructions</h2>
            {recipe.instructions && recipe.instructions.length > 0 && (
              <div className="space-y-4">
                {recipe.instructions.map((item, index) => (
                  <p key={index} className="text-stone-800 p-4 bg-gray-50 rounded-lg shadow-sm">
                    {item}
                  </p>
                ))}
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="text-xl text-rose-500">Loading recipe...</div>
      )}
    </motion.div>
  );
};

export default Recipe;