import { FunctionComponent } from 'react';
import { Card, Status } from './styles';

type DummyProps = {
  status: ApiDummySample | {};
};

export const Dummy: FunctionComponent<DummyProps> = ({ status }) => {
  const text = 'status' in status ? status.status : 'Loading...';

  return (
    <Card>
      <Status>{text}</Status>
    </Card>
  );
};
