import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MeasureResult from './MeasureResult';

describe('<MeasureResult />', () => {
  test('it should mount', () => {
    render(<MeasureResult />);
    
    const measureResult = screen.getByTestId('MeasureResult');

    expect(measureResult).toBeInTheDocument();
  });
});