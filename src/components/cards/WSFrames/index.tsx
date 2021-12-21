import { useEffect } from 'react';
import { useStream } from '../../../hooks';
import { api } from '../../../services/resources';
import type { TCard } from '../../shared/CardManager';

type TProps = {
  cityId: number;
};

type Frame = {
  uuid: string;
  deviceId: string;
  name: string;
};

const URL_DEVICES = api.baseURL.replace(/^http/, `ws`) + `/api/devices/online`;

export const CardWSFrames: TCard<TProps> = ({ card, cityId }) => {
  const { setTitle } = card;
  const { frames, status } = useStream<Frame>(URL_DEVICES + `?city=${cityId}`);

  useEffect(() => {
    setTitle(`City ${cityId}`);
  }, [setTitle, cityId]);

  if (card.smallsize) {
    return <strong>{frames.length} frames</strong>;
  }
  return (
    <>
      All frames ({frames.length}) ~ {status}
      <pre>{JSON.stringify(frames, null, 2)}</pre>
    </>
  );
};
