import { useEffect } from 'react';
import {
  useAsyncActionCreator,
  useTypedSelector,
} from '../../redux-tk-providers';
import { getSample } from './Redux';
import { Dummy } from './View';

export const DummyContainer = () => {
  const status = useTypedSelector((state) => state.status);
  const { data, loading, error } = status;
  const getStatus = useAsyncActionCreator(getSample);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return <Dummy data={data} loading={loading} error={error} />;
};
