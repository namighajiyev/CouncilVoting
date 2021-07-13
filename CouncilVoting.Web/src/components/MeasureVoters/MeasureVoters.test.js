import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MeasureVoters from './MeasureVoters';

describe('<MeasureVoters />', () => {
  test('it should mount', () => {
    render(<MeasureVoters />);
    
    const measureVoters = screen.getByTestId('MeasureVoters');

    expect(measureVoters).toBeInTheDocument();
  });
});