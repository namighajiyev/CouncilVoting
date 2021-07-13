import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MeasureResultInfo from './MeasureResultInfo';

describe('<MeasureResultInfo />', () => {
  test('it should mount', () => {
    render(<MeasureResultInfo />);
    
    const measureResultInfo = screen.getByTestId('MeasureResultInfo');

    expect(measureResultInfo).toBeInTheDocument();
  });
});