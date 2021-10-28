import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFound } from '.';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe(NotFound, () => {
  it(`render 404 code`, () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NotFound />
      </Router>
    );
    const code = screen.getByText(/404/);
    expect(code).toBeInTheDocument();
  });

  it(`render wrong path`, () => {
    const path404 = `/page/somethiong-wrong`;
    const history = createMemoryHistory();
    history.push(path404);
    render(
      <Router history={history}>
        <NotFound />
      </Router>
    );
    const textPath = screen.getByText(path404);
    expect(textPath).toBeInTheDocument();
  });
});
