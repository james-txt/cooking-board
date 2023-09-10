import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Provides a mock router context
import Footer from "../Footer";

describe("Footer component", () => {
  // Wrap the component with MemoryRouter to avoid any "You should not use <Link> outside a <Router>" warnings
  const renderWithRouter = (component) => {
    return render(
    <MemoryRouter>{component}</MemoryRouter>
    );
  };

  it("should render the copyright text", () => {
    renderWithRouter(<Footer />);
    const textElement = screen.getByText(/© 2023 Cooking Board™/i);
    expect(textElement).toBeInTheDocument();
  });

  it("should render the About link", () => {
    renderWithRouter(<Footer />);
    const linkElement = screen.getByText(/About/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/about");
  });

  it("should render the Contact link", () => {
    renderWithRouter(<Footer />);
    const linkElement = screen.getByText(/Contact/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/contact");
  });
});
