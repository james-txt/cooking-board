import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom'; 
import RecipeCard from '../RecipeCard'; 
import '@testing-library/jest-dom/extend-expect';


describe('RecipeCard', () => { 
  const mockRecipe = 
  { id: '001', 
  name: 'Garlic Chili Chicken Wings', 
  picture: "https://recipepictures.blob.core.windows.net/recipepictures/001GarlicChiliChickenWings.jpg" };

beforeEach(() => {
  render( 
    <MemoryRouter> 
      <RecipeCard recipe={mockRecipe} /> 
    </MemoryRouter> 
); });

test('displays recipe name', () => { 
  const recipeName = screen.getByText(mockRecipe.name); 
  expect(recipeName).toBeInTheDocument(); });

test('has a link to the recipe detail', () => { 
  const link = screen.getByRole('link', { name: mockRecipe.name }); 
  expect(link).toHaveAttribute('href', `/recipe/${mockRecipe.id}`); });

test('displays the recipe image with correct src and alt attributes', () => { 
  const image = screen.getByRole('img', { name: mockRecipe.name }); 
  expect(image).toHaveAttribute('src', mockRecipe.picture); 
  expect(image).toHaveAttribute('alt', mockRecipe.name); }); });