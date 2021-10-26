import { useEffect } from 'react';
import {
  useAsyncActionCreator,
  useTypedSelector,
} from '../../../redux-providers';
import { StatusState } from './Container';
import { getStatusActionCreator } from './Redux';

export function useStatusState(): StatusState {
  const status = useTypedSelector((state) => state.status);
  const getStatus = useAsyncActionCreator(getStatusActionCreator);

  useEffect(() => {
    getStatus();
  }, [getStatus]);

  return {
    statusLoading: status.loading,
    statusData: status.data,
    statusError: status.error,
  };
}
