import { FunctionComponent } from 'react';

type Status = {
  status: ApiSegChecker | {};
};

export const Dummy: FunctionComponent<Status> = ({ status }) => {
  return <div>{status}</div>;
};
