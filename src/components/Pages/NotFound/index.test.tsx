import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NotFoundPage } from '.';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

describe(NotFoundPage, () => {
  it(`render 404 code`, () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NotFoundPage />
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
        <NotFoundPage />
      </Router>
    );
    const textPath = screen.getByText(path404);
    expect(textPath).toBeInTheDocument();
  });
});
