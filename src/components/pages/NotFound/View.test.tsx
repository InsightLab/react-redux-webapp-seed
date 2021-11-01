import { render, screen } from '@testing-library/react';
import { NotFoundView } from './View';
import '@testing-library/jest-dom';

describe(NotFoundView, () => {
  it(`render 404 code`, () => {
    render(<NotFoundView pathname="" />);
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });

  it(`render wrong path`, () => {
    const path404 = `/page/somethiong-wrong`;
    render(<NotFoundView pathname={path404} />);
    expect(screen.getByText(path404)).toBeInTheDocument();
  });
});
