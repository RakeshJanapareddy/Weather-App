import React from 'react';
import { render, screen, debug } from '@testing-library/react';
import App from './App';

test('renders weather by city', () => {
  render(<App />);
  
});