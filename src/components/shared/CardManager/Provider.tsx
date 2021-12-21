import { ReactNode, useContext, createContext } from 'react';
import { useCardManagerData } from './Manager';
import { CardBase } from './CardBase';
import { TDataCardManager } from './types';

type Props = {
  classNameCard?: string;
  children?: ReactNode;
};

const Context = createContext<TDataCardManager>({} as TDataCardManager);

export const CardManagerProvider = ({ classNameCard, children }: Props) => {
  const value = useCardManagerData();
  return (
    <Context.Provider value={value}>
      {children}
      <>
        {value.cards.map((card) => (
          <CardBase key={card.id} card={card} className={classNameCard} />
        ))}
      </>
    </Context.Provider>
  );
};

export const useCardManager = () => {
  const value = useContext(Context);
  if (!value) {
    throw new Error(`useCardManager must be used within a CardManagerProvider`);
  }
  return value;
};
