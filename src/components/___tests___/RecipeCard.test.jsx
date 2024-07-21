import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import { MemoryRouter } from 'react-router-dom'; 
import RecipeCard from '../RecipeCard';


describe('RecipeCard', () => { 
  const mockrecipe = 
  { id: '001', 
  name: 'Garlic Chili Chicken Wings', 
  picture: "https://recipepictures.blob.core.windows.net/recipepictures/001GarlicChiliChickenWings.jpg" };

test('displays recipe name', () => { 
  render( 
    <MemoryRouter> 
      <RecipeCard recipe={mockrecipe} /> 
    </MemoryRouter> 
  );
  const recipeName = screen.getByText(mockrecipe.name); 
  expect(recipeName).toBeInTheDocument(); 
});

test('has a link to the recipe detail', () => { 
  render( 
    <MemoryRouter> 
      <RecipeCard recipe={mockrecipe} /> 
    </MemoryRouter> 
  );
  const link = screen.getByRole('link', { name: mockrecipe.name }); 
  expect(link).toHaveAttribute('href', `/recipe/${mockrecipe.id}`); 
});

test('displays the recipe image with correct src and alt attributes', () => { 
  render( 
    <MemoryRouter> 
      <RecipeCard recipe={mockrecipe} /> 
    </MemoryRouter> 
  );
  const image = screen.getByRole('img', { name: mockrecipe.name }); 
  expect(image).toHaveAttribute('src', mockrecipe.picture); 
  expect(image).toHaveAttribute('alt', mockrecipe.name); 
});

});