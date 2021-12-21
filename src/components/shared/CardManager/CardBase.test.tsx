import { render, screen } from '@testing-library/react';
import { CardBase } from './CardBase';
import { TCard } from '.';
import '@testing-library/jest-dom';

const CardExample: TCard = () => {
  return <p>Hello</p>;
};

const cardDataProps = {
  id: '1',
  CardContent: CardExample,
  props: {},
  smallsize: true,
  position: { x: 0, y: 0 },
  hasFocus: true,
  zIndex: 1,
};

describe(CardBase, () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  it(`render a basic card`, async () => {
    render(<CardBase card={cardDataProps} />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it(`render card with custom className`, async () => {
    const className = `custom-class`;
    const { container } = render(
      <CardBase card={cardDataProps} className={className} />
    );
    expect(container.querySelectorAll(`.${className}`).length).toEqual(1);
  });
});
