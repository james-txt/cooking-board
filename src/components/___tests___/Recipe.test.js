import React from 'react';
import { render } from '@testing-library/react';
import Recipe from '../Recipe';

test('Recipe component renders without errors', () => {
  render(<Recipe />);
});
