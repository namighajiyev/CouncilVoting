import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MeasureList from './MeasureList';

describe('<MeasureList />', () => {
  test('it should mount', () => {
    render(<MeasureList />);
    
    const measureList = screen.getByTestId('MeasureList');

    expect(measureList).toBeInTheDocument();
  });
});