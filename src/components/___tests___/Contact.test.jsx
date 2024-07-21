import React from 'react';
import { render, screen } from '@testing-library/react';
import Contact from '../Contact';

test('Contact component renders without errors', () => {
  render(<Contact />);
  expect(screen.getByText('Contact me: jameslo.txt@gmail.com')).toBeInTheDocument();
});
