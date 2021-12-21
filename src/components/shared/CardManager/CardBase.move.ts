import { useEffect, useRef } from 'react';
import { TCardBase, TDataCardManager } from './types';

type TMoveData = {
  x: number;
  y: number;
  marginX: number;
  marginY: number;
  moving: boolean;
};

type TMoveProps = {
  domRef: any;
  card: TCardBase;
  cardManager: TDataCardManager;
  setState: any;
};

export const useCardBaseMove = (data: TMoveProps) => {
  const { domRef, card, cardManager, setState } = data;
  const cardId = card.id;
  const posRef = useRef<TMoveData>({} as TMoveData);

  useEffect(() => {
    const mouseUp = () => {
      if (posRef.current.moving) {
        posRef.current.moving = false;
        setState((prev: any) => {
          if (prev.moving) {
            const { x, y } = prev;
            setImmediate(() => {
              cardManager.updateCardPosition(cardId, { x, y });
            });
            return { ...prev, moving: false };
          }
          return prev;
        });
        document.body.style.userSelect = `auto`;
      }
    };
    const mouseMove = (event: any) => {
      if (posRef.current.moving) {
        const x = event.clientX + posRef.current.marginX;
        const y = event.clientY + posRef.current.marginY;
        setState((s: any) => ({ ...s, x, y }));
      }
    };
    document.addEventListener(`mousemove`, mouseMove, { passive: true });
    document.addEventListener(`mouseup`, mouseUp, { passive: true });
    return () => {
      document.removeEventListener(`mousemove`, mouseMove);
      document.removeEventListener(`mouseup`, mouseUp);
    };
  }, [cardId, cardManager, setState]);

  const mouseDown = (event: any) => {
    const cardNode = domRef.current;
    const byPassTags =
      /(header|footer|article|section|div|p|pre|code|strong|h[1-6])/i;
    let node = event.target;
    for (let i = 0; i < 3; i++) {
      if (node === cardNode || !byPassTags.test(node.nodeName)) {
        break;
      }
      node = node.parentNode;
    }
    if (!cardNode || node !== cardNode) {
      cardManager.focusCard(card.id);
      return;
    }
    const bbox = cardNode.getBoundingClientRect();
    const vecx = bbox.x - event.clientX;
    const vecy = bbox.y - event.clientY;
    posRef.current.marginX = vecx;
    posRef.current.marginY = vecy;
    posRef.current.moving = true;
    cardManager.focusCard(card.id);
    setState((s: any) => ({ ...s, moving: true }));
    document.body.style.userSelect = `none`;
    document.getSelection()?.empty();
  };

  return { mouseDown };
};
