import { FunctionComponent, useEffect } from 'react';
import { useActionCreator } from '../../hooks/ReduxActions';
import { useTypedSelector } from '../../redux-providers/store';
import { getSegStatus } from './Redux';
import { Dummy } from './View';

export const DummyContainer: FunctionComponent = () => {
  const status = useTypedSelector((state) => state.status);
  const { data } = status as ReduxSagaState<ApiSegChecker>;
  const getStatus = useActionCreator(getSegStatus);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return <Dummy status={data} />;
};
