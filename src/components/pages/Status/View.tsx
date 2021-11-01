import { Card, Status, Text } from './View.styled';

type StatusViewProps = {
  status: ApiStatus | {};
};

export const StatusView = ({ status }: StatusViewProps) => {
  const text = 'status' in status ? status.status : '';

  return (
    <>
      <Card>
        <Status>{text}</Status>
      </Card>
      <Text>react-redux-webapp-seed</Text>
    </>
  );
};
