import { Card, Status, Text } from './Styles';

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
