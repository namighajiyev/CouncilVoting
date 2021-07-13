import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MeasureVote from './MeasureVote';

describe('<MeasureVote />', () => {
  test('it should mount', () => {
    render(<MeasureVote />);
    
    const measureVote = screen.getByTestId('MeasureVote');

    expect(measureVote).toBeInTheDocument();
  });
});