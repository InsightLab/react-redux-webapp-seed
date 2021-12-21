import { useEffect, useRef } from 'react';
import { TCardId, TCardPosition, TPosition } from './types';

export const CARD_ATTR_DATA = 'cm-card';
export const CARD_MIN_WIDTH = 190;
export const CARD_MIN_HEIGHT = 95;
const CARD_GRID_TOP = 30;
const CARD_GRID_LEFT = 50;
const CARD_GRID_PADDING = 15;
const CARD_MAX_DISTANCE = 100000;

function calcBasicDistance(pointA: TPosition, pointB: TPosition) {
  const a = Math.abs(pointA.x - pointB.x);
  const b = Math.abs(pointA.y - pointB.y);
  return a + b;
}

export const genCardId = (): TCardId => {
  return (`C` + Math.random().toString(16).slice(2)) as TCardId;
};

export const genCardPosition = (): TPosition => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const x = Math.floor(width * 0.15 + Math.random() * width * 0.6);
  const y = Math.floor(height * 0.2 + Math.random() * height * 0.3);
  return { x, y };
};

export const collapseCards = <T extends TCardPosition>(cards: T[]): T[] => {
  const windowHeight = window.innerHeight;
  let _x = CARD_GRID_LEFT;
  let _y = CARD_GRID_TOP;
  let movingCards = [...cards];
  const getNearCard = (pos: { x: number; y: number }) => {
    let cardId = ``;
    let minDistance = CARD_MAX_DISTANCE;
    for (let i = 0; i < movingCards.length; i++) {
      const dist = calcBasicDistance(movingCards[i].position, pos);
      if (dist < minDistance) {
        cardId = movingCards[i].id;
        minDistance = dist;
      }
    }
    const nearCard = movingCards.find((c) => c.id === cardId)!;
    movingCards = movingCards.filter((c) => c.id !== cardId);
    return nearCard;
  };
  return cards.map(() => {
    let x = _x;
    let y = _y;
    if (y > windowHeight - CARD_MIN_HEIGHT * 1.5) {
      x += CARD_MIN_WIDTH + CARD_GRID_PADDING;
      y = CARD_GRID_TOP;
    }
    _x = x;
    _y = y + CARD_MIN_HEIGHT + CARD_GRID_PADDING;
    const position = { x, y };
    const card = getNearCard(position);
    return { ...card, position, smallsize: true };
  });
};

export const useClickCardScreen = (
  fn: (cardNode: HTMLElement | null) => void
) => {
  const fnRef = useRef<any>();
  fnRef.current = fn;
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const maxDeepTest = 10;
      let node: any = event.target;
      for (let i = 0; i < maxDeepTest; i++) {
        if (!node || !node.getAttribute) {
          return;
        }
        if (node.getAttribute('data') === CARD_ATTR_DATA) {
          fnRef.current(node);
          return;
        }
        if (node.nodeName === 'HTML') {
          fnRef.current(null);
          return;
        }
        node = node.parentNode;
      }
    }
    document.addEventListener('mousedown', handleClick, { passive: true });
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
};
