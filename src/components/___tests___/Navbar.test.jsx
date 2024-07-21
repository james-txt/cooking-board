import React from 'react';
import { render } from '@testing-library/react';
import Navbar from '../Navbar';

test('Navbar component without errors', () => {
  render(<Navbar />);
});
