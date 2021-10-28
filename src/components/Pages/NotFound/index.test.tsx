import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFoundView } from '.';

describe(NotFoundView, () => {
  it(`render 404 code`, () => {
    render(<NotFoundView pathname="" />);

    const code = screen.getByText(/404/);
    expect(code).toBeInTheDocument();
  });

  it(`render wrong path`, () => {
    const path404 = `/page/somethiong-wrong`;

    render(<NotFoundView pathname={path404} />);

    const textPath = screen.getByText(path404);
    expect(textPath).toBeInTheDocument();
  });
});
