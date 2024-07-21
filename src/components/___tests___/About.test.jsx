import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../About';

test('About component renders without errors', () => {
  render(<About />);
  expect(screen.getByText("Embark on a delectable journey with me, as I draw upon a decade of culinary expertise. From bustling kitchens to serene farms, I've soaked in a world of flavors, scents, and visual delights. These encounters have inspired my unique recipes, each dish a harmonious blend of tradition and creativity. On this site, I'm thrilled to share a tapestry of tastes that reflect the sum of my culinary adventures. Join me and savor the fruits of a decade's worth of passion and exploration.")).toBeInTheDocument();
});
