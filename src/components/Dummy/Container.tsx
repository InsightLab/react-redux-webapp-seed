import { useEffect } from 'react';
import { useActionCreator, useTypedSelector } from '../../redux-providers';
import { getSample } from './Redux';
import { Dummy } from './View';

export const DummyContainer = () => {
  const status = useTypedSelector((state) => state.status);
  const { data, loading, error } = status as ReduxSagaState<ApiDummySample>;
  const getStatus = useActionCreator(getSample);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return <Dummy data={data} loading={loading} error={error} />;
};
