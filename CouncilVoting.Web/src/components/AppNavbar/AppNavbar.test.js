import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppNavbar from './AppNavbar';

describe('<AppNavbar />', () => {
  test('it should mount', () => {
    render(<AppNavbar />);
    
    const appNavbar = screen.getByTestId('AppNavbar');

    expect(appNavbar).toBeInTheDocument();
  });
});