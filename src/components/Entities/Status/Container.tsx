import { Loading } from '../../UI';
import { useStatusState } from './State';
import { StatusView } from './View';

export type StatusState = {
  statusLoading: boolean;
  statusData: ApiStatus | {};
  statusError: ApiError;
};

export const StatusContainer = () => {
  const { statusLoading, statusData } = useStatusState();

  if (statusLoading) return <Loading />;

  return <StatusView status={statusData} />;
};
