import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CustomList from './CustomList';

describe('<CustomList />', () => {
  test('it should mount', () => {
    render(<CustomList />);
    
    const customList = screen.getByTestId('CustomList');

    expect(customList).toBeInTheDocument();
  });
});