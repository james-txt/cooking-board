import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import Home from '../Home'; 


describe('<Home />', () => { 
  it('renders buttons with correct tags', () => { 
    render(<Home />);

const tags = ["CHICKEN", "DAIRY", "BEEF", "PORK", "TURKEY", "SOY", "SEAFOOD", "VEGETABLE", "BAKING", "DESSERT"];
tags.forEach(tag => {
  expect(screen.getByText(tag)).toBeInTheDocument();
});
});

it('calls handleTagClick with correct tag when button is clicked', () => { 
  const handleTagClick = jest.fn(); 
  render(<Home handleTagClick={handleTagClick} />);
});
});