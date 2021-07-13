import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MeasureResultResults from './MeasureResultResults';

describe('<MeasureResultResults />', () => {
  test('it should mount', () => {
    render(<MeasureResultResults />);
    
    const measureResultResults = screen.getByTestId('MeasureResultResults');

    expect(measureResultResults).toBeInTheDocument();
  });
});