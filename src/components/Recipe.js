import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Recipe = () => {
	const { id } = useParams();
	const [recipe, setRecipe] = useState();
	const ingredients = [];
	const instructions = [];

	useEffect(() => {
		fetch(`https://searchidcookingboard.azurewebsites.net/api/searchid?id=${id}`)
		.then((res) => res.json())
		.then((data) => setRecipe(data[0]))
		.catch((error) => console.log(error.message));
	}, [setRecipe, id]);

	// get ingredients

	if (recipe) {
		for (let i = 1; i <= 20; i++) {
			if (
				recipe[`ingredients${i}`] === "" ||
				recipe[`ingredients${i}`] === undefined
			) {
				break;
			} else {
				ingredients.push(
				recipe[`ingredients${i}`]
				);
			}
		}
	}

	// get instructions

	if (recipe) {
		for (let i = 1; i <= 20; i++) {
			if (
				recipe[`instructions${i}`] === "" ||
				recipe[`instructions${i}`] === undefined
			) {
				break;
			} else {
				instructions.push(
				recipe[`instructions${i}`]
				);
			}
		}
	}

	return (
	<div className="flex justify-center">	
		<div className="justify-center rounded border-stone-200 border shadow-md bg-white max-lg:max-w-2xl lg:max-w-5xl mx-4 px-8 pt-8 my-12">
			{
				recipe && (
				<>
					<h1 className="text-3xl font-medium text-rose-500 pb-6">{recipe.name}</h1>
					<div className="flex flex-wrap gap-8 pb-8 items-center">
						<img className="rounded w-auto"  src={recipe.picture} alt={recipe.name} />
						<div className="shrink-0">
							<hr className="pb-6"></hr>
							<h2 className="text-2xl font-medium text-rose-500 pb-4">Ingredients :</h2>
								{ingredients.length > 0 &&
									ingredients.map((item) => 
									<li className="md:text-base lg:text-lg pb-2 text-ellipsis">{item}</li>
									)}
						</div>

						<div>
							<h2 className="text-2xl font-medium text-rose-500 pb-4">Instructions :</h2>
								{instructions.length > 0 &&
										instructions.map((item) => 
										<p className="md:text-base lg:text-lg border shadow-sm shadow-stone-500 my-3 border-stone-300 p-3 text-ellipsis">{item}</p>
										)}
						</div>
							{/*<h2 className="text-2xl font-medium text-rose-500 pb-4">Tags :</h2>*/}
					</div>
					{/*<div id="tag-btn" className="flex flex-wrap flex-grow-0 gap-2 pb-8">
							<button className="tag">CHICKEN</button>
							<button className="tag">BEEF</button>
								</div>*/}
				</>
			)}
		</div>
	</div>
	)
}

export default Recipe;