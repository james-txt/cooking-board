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
		<div className="flex items-center justify-center">
			<div className="rounded border-stone-200 border shadow-md bg-white max-lg:max-w-2xl lg:max-w-5xl mx-4 px-8 pt-8 my-12">
				{recipe && (
					<>
						<header>
							<div className="flex">
								<a href="/" className="text-rose-500 mb-8 hover:text-rose-400 mr-8">
									<svg className="w-7 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 9">
										<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
									</svg>
								</a>
								<h1 className="text-3xl font-medium text-rose-500 pb-6">{recipe.name}</h1>
							</div>
						</header>
	
						<div className="flex flex-wrap gap-8 pb-8 items-center">
							<img className="rounded w-auto" src={recipe.picture} alt={recipe.name} />
							<div className="shrink-0">
								<hr className="pb-6" />
								<section>
									<h2 className="text-2xl font-medium text-rose-500 pb-4">Ingredients:</h2>
									<ul className="list-disc list-inside">
										{ingredients.length > 0 &&
											ingredients.map((item, index) => (
												<li key={index} className="md:text-base lg:text-lg text-stone-800 pb-2">{item}</li>
											))}
									</ul>
								</section>
							</div>
	
							<div>
								<section>
									<h2 className="text-2xl font-medium text-rose-500 pb-4">Instructions:</h2>
									{instructions.length > 0 &&
										instructions.map((item, index) => (
											<p key={index} className="md:text-base lg:text-lg text-stone-800 border shadow-sm shadow-stone-500 my-3 border-stone-300 p-3 text-ellipsis">{item}</p>
										))}
								</section>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Recipe;