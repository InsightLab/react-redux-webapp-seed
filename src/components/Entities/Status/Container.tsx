import { Loading } from '../../UI';
import { useStatusState } from './State';
import { StatusView } from './View';

export const StatusContainer = () => {
  const { loading: statusLoading, data: statusData } = useStatusState();

  if (statusLoading) return <Loading />;

  return <StatusView status={statusData} />;
};
