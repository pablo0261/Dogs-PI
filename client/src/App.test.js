import { render, screen } from '@testing-library/react';
import App from './App';

<<<<<<< HEAD
test('renders App component', () => {
  render(<App />);
    const textElement = screen.getByText(/landing/i);
  expect(textElement).toBeInTheDocument();
});
=======
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
>>>>>>> main
