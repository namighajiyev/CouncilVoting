import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewMeasure from './NewMeasure';

describe('<NewMeasure />', () => {
  test('it should mount', () => {
    render(<NewMeasure />);
    
    const newMeasure = screen.getByTestId('NewMeasure');

    expect(newMeasure).toBeInTheDocument();
  });
});