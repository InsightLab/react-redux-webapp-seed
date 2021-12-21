export type TCardId = string;
export type TPosition = { x: number; y: number };

export type TCardPosition = {
  id: TCardId;
  position: TPosition;
};

export type TCardBase<T = any> = {
  id: TCardId;
  CardContent: TCard<T>;
  props: T;
  smallsize?: boolean;
  position: TPosition;
  hasFocus: boolean;
  zIndex: number;
};

export type TCardProps = {
  card: {
    smallsize?: boolean;
    setTitle: (title: string) => void;
  };
};

export type TCard<T = {}> = (props: TCardProps & T) => JSX.Element;

export type TDataCardManager = {
  cards: TCardBase[];
  currentZ: number;
  openCard: <T>(Card: TCard<T>, props: Exclude<T, TCardProps>) => void;
  focusCard: (cardId: TCardId) => void;
  closeCard: (cardId: TCardId) => void;
  closeAll: () => void;
  updateCardPosition: (cardId: TCardId, position: TPosition) => void;
  toggleSize: (cardId: TCardId) => void;
  collapseAll: () => void;
  expandAll: () => void;
};
