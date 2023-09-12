import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../Contact';

test('Contact component renders without errors', () => {
  render(<Contact />);
});
