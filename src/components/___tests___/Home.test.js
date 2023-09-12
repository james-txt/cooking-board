import React from 'react';
import { render } from '@testing-library/react';
import Home from '../Home';

test('Home component renders without errors', () => {
  render(<Home />);
});
