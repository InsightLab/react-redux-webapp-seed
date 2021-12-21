import { render, screen, waitFor } from '@testing-library/react';
import { services } from '../../../services';
import { CardStatus } from '.';
import '@testing-library/jest-dom';

const cardBaseMock = {
  setTitle: () => {},
};

describe(CardStatus, () => {
  it(`render card`, async () => {
    jest.spyOn(services.status, `getStatus`).mockReturnValue(
      Promise.resolve({
        env: 'test',
        gateway: 'gateway-test',
        status: 'Mock works! 🚀',
        version: '0.1.1',
      })
    );
    const card = {
      ...cardBaseMock,
    };
    render(<CardStatus card={card} />);
    expect(screen.queryByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/mock works/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
});
