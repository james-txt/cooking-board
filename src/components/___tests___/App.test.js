import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import App from '../../App.js';


const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

  it('renders without crashing', () => {
    renderWithRouter(<App />);
  });

  it('renders Navbar and Footer', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('COOKING BOARD')).toBeInTheDocument();
  });

  it('renders Home route by default', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('TAG')).toBeInTheDocument();
  });

  it('renders Contact route', () => {
    renderWithRouter(<App />, { route: '/contact' });
    expect(screen.getByText('Contact me: jameslo.txt@gmail.com')).toBeInTheDocument();
  });

  it('renders About route', () => {
    renderWithRouter(<App />, { route: '/about' });
    expect(screen.getByText("Embark on a delectable journey with me, as I draw upon a decade of culinary expertise. From bustling kitchens to serene farms, I've soaked in a world of flavors, scents, and visual delights. These encounters have inspired my unique recipes, each dish a harmonious blend of tradition and creativity. On this site, I'm thrilled to share a tapestry of tastes that reflect the sum of my culinary adventures. Join me and savor the fruits of a decade's worth of passion and exploration.")).toBeInTheDocument();
  });