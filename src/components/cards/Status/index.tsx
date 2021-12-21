import { useEffect, useState } from 'react';
import { services } from '../../../services';
import type { TCard } from '../../shared/CardManager';

export const CardStatus: TCard = ({ card }) => {
  const { setTitle } = card;
  const [data, setData] = useState<ApiStatus>();

  useEffect(() => {
    setTitle(`Status`);
    services.status.getStatus().then((jsonData) => {
      setData(jsonData);
    });
  }, [setTitle]);

  if (card.smallsize) {
    return <i>{data && `status` in data ? data.status : `Loading...`}</i>;
  }
  return <pre>{JSON.stringify(data || `Loading...`, null, 2)}</pre>;
};
