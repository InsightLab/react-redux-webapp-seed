import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCardManager } from './Provider';
import { CardBaseView } from './CardBaseView';
import { useCardBaseMove } from './CardBase.move';
import { TCardBase } from './types';

type TCardBaseState = {
  title: string;
  x: number;
  y: number;
  z: number;
  opening: boolean;
  moving: boolean;
};

type TCardBaseProps = {
  card: TCardBase;
  className?: string;
};

export function CardBase({ card, className }: TCardBaseProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const cardManager = useCardManager();
  const [state, setState] = useState<TCardBaseState>(() => {
    const { zIndex } = card;
    const { x, y } = card.position;
    return { title: ``, x, y, z: zIndex, moving: false, opening: true };
  });
  const { mouseDown } = useCardBaseMove({
    card,
    domRef,
    cardManager,
    setState,
  });
  const { smallsize, position, zIndex } = card;

  useEffect(() => {
    const doneOpening = () =>
      setState((prev) => ({
        ...prev,
        opening: false,
      }));
    setImmediate(doneOpening);
  }, []);

  useEffect(() => {
    const { x, y } = position;
    setState((prev) => ({ ...prev, x, y }));
  }, [position]);

  useEffect(() => {
    setState((prev) => ({ ...prev, z: zIndex, smallsize }));
  }, [zIndex, smallsize]);

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const cardMethods = useMemo(() => {
    return { smallsize, setTitle };
  }, [smallsize, setTitle]);

  const viewData = {
    domRef,
    card,
    cardMethods,
    state,
    smallsize,
    hasFocus: state.z === cardManager.currentZ,
    cardManager,
    mouseDown,
  };
  return <CardBaseView className={className || ``} data={viewData} />;
}
