import { FunctionComponent } from 'react';
import { Card, Status } from './styles';

type Status = {
  status: ApiSegChecker | {};
};

export const Dummy: FunctionComponent<Status> = ({ status }) => {
  return (
    <Card>
      <Status>{status}</Status>
    </Card>
  );
};
