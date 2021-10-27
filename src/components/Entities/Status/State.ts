import { useEffect } from 'react';
import {
  useActionCreator,
  useAsyncActionCreator,
  useTypedSelector,
} from '../../../redux-providers';
import { clearStatusActionCreator, getStatusActionCreator } from './Redux';

export function useStatusState() {
  const status = useTypedSelector((state) => state.status);
  const getStatus = useAsyncActionCreator(getStatusActionCreator);
  const clearStatus = useActionCreator(clearStatusActionCreator);

  useEffect(() => {
    getStatus();

    return () => {
      clearStatus();
    };
  }, [getStatus, clearStatus]);

  return status;
}
