import { useMemo } from 'react';
import { ErrorBoundary } from '../../shared';
import * as UI from './CardBase.styled';
import { TCardBase, TDataCardManager } from './types';

type TCardBaseView = {
  className: string;
  data: {
    domRef: any;
    card: TCardBase;
    cardMethods: any;
    state: any;
    smallsize?: boolean;
    hasFocus?: boolean;
    cardManager: TDataCardManager;
    mouseDown: any;
  };
};

export const CardBaseView = ({ className, data }: TCardBaseView) => {
  const {
    domRef,
    card,
    cardMethods,
    state,
    smallsize,
    hasFocus,
    cardManager,
    mouseDown,
  } = data;

  const CardBody = useMemo(() => {
    const { CardContent, props } = card;
    return (
      <UI.CardBody>
        <CardContent card={cardMethods} {...props} />
      </UI.CardBody>
    );
  }, [card, cardMethods]);

  const CardHeader = useMemo(() => {
    return (
      <UI.CardHeader>
        <UI.CardControls hasFocus={hasFocus}>
          <UI.ButtonControl
            color="#FF5F57"
            onClick={() => cardManager.closeCard(card.id)}
          />
          <UI.ButtonControl
            color="#FEBC2E"
            disabled={smallsize}
            onClick={() => cardManager.toggleSize(card.id)}
          />
          <UI.ButtonControl
            color="#28C840"
            disabled={!smallsize}
            onClick={() => cardManager.toggleSize(card.id)}
          />
        </UI.CardControls>
        <UI.CardTitle>{state.title}</UI.CardTitle>
      </UI.CardHeader>
    );
  }, [cardManager, card, state, smallsize, hasFocus]);

  return (
    <UI.CardWindow
      ref={domRef}
      className={className}
      onMouseDown={mouseDown}
      position={state}
      opening={state.opening}
      smallsize={card.smallsize}
      noAnimation={state.moving}
      hasFocus={hasFocus}
    >
      <ErrorBoundary>
        {CardHeader}
        {CardBody}
      </ErrorBoundary>
    </UI.CardWindow>
  );
};
