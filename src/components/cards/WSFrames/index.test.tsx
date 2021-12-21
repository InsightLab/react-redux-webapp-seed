import { render, screen } from '@testing-library/react';
import { CardWSFrames } from '.';
import '@testing-library/jest-dom';

jest.mock(`../../../hooks`, () => ({
  useStream: () => {
    return {
      frames: [{ name: 'AAA' }, { name: 'BBB' }],
    };
  },
}));

const cardBaseMock = {
  setTitle: () => {},
};

describe(CardWSFrames, () => {
  it(`render card`, () => {
    const card = {
      ...cardBaseMock,
    };
    render(<CardWSFrames card={card} cityId={0} />);
    expect(screen.getByText(/Frames \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/AAA/)).toBeInTheDocument();
  });

  it(`render in smallsize mode`, () => {
    const card = {
      ...cardBaseMock,
      smallsize: true,
    };
    render(<CardWSFrames card={card} cityId={0} />);
    expect(screen.getByText(/2 frames/i)).toBeInTheDocument();
  });
});
