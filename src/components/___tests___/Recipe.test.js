import React from 'react';
import { render } from '@testing-library/react';
import Recipe from '../Recipe';

test('RecipeCard component renders without errors', () => {
  render(<Recipe />);
});
