import { useCardManager } from '../../shared/CardManager';
import { Card, Status, Text } from './View.styled';
import { CardWSFrames } from '../../cards/WSFrames';
import { CardStatus } from '../../cards/Status';

type StatusViewProps = {
  status: ApiStatus | {};
};

export const StatusView = ({ status }: StatusViewProps) => {
  const text = 'status' in status ? status.status : '';

  const cardManager = useCardManager();

  const clickNewCardStatus = () => {
    cardManager.openCard(CardStatus, {});
  };

  const clickNewCardFrames = () => {
    const randCode = Math.floor(Math.random() * 10000);
    cardManager.openCard(CardWSFrames, { cityId: randCode });
  };

  return (
    <>
      <Card>
        <Status>{text}</Status>
      </Card>
      <Text>react-redux-webapp-seed</Text>
      <Text>
        <button onClick={clickNewCardStatus}>Open CardStatus</button>
        <button onClick={clickNewCardFrames}>Open CardFrames</button>
        <br />
        <button onClick={cardManager.collapseAll}>Collapse All Cards</button>
        <button onClick={cardManager.expandAll}>Expanding All Cards</button>
        <button onClick={cardManager.closeAll}>Close All</button>
      </Text>
    </>
  );
};
