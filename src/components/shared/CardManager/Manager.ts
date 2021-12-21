import { useState } from 'react';
import {
  collapseCards,
  genCardId,
  genCardPosition,
  useClickCardScreen,
} from './Manager.utils';
import {
  TCard,
  TCardBase,
  TCardId,
  TCardProps,
  TDataCardManager,
  TPosition,
} from './types';

export const useCardManagerData = (): TDataCardManager => {
  const [cards, setCards] = useState<TCardBase[]>([]);
  const [currentZ, setCurrentZ] = useState<number>(1);

  useClickCardScreen((cardNode) => {
    if (!cardNode) setCurrentZ((z) => z + 1);
  });

  return {
    cards,
    currentZ,
    openCard: <T>(CardContent: TCard<T>, props: Exclude<T, TCardProps>) => {
      const data = {
        id: genCardId(),
        CardContent,
        props,
        smallsize: false,
        hasFocus: true,
        position: genCardPosition(),
        zIndex: currentZ + 1,
      };
      setCards((prev) => [...prev, data]);
      setCurrentZ((z) => z + 1);
    },
    focusCard: (cardId: TCardId) => {
      const zIndex = currentZ + 1;
      setCurrentZ(zIndex);
      setCards((prev) =>
        prev.map((card) => {
          return card.id !== cardId ? card : { ...card, zIndex };
        })
      );
    },
    closeCard: (cardId: TCardId) => {
      setCards((prev) => prev.filter((card) => card.id !== cardId));
    },
    closeAll: () => {
      setCards([]);
    },
    updateCardPosition: (cardId: TCardId, position: TPosition) => {
      setCards((prev) =>
        prev.map((card) => {
          return card.id !== cardId ? card : { ...card, position };
        })
      );
    },
    toggleSize: (cardId: TCardId) => {
      setCards((prev) =>
        prev.map((card) => {
          return card.id !== cardId
            ? card
            : { ...card, smallsize: !card.smallsize };
        })
      );
    },
    collapseAll: () => {
      setCards((cards) => collapseCards(cards));
      setCurrentZ((z) => z + 1);
    },
    expandAll: () => {
      setCards((prev) =>
        prev.map((card) => ({
          ...card,
          smallsize: false,
          position: genCardPosition(),
        }))
      );
    },
  };
};
