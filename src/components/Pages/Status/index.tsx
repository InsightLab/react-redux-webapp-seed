import { Loading } from '../../Shared';
import { useStatusState } from './State';
import { StatusView } from './View';

export const StatusPage = () => {
  const { loading: statusLoading, data: statusData } = useStatusState();

  if (statusLoading) return <Loading />;

  return <StatusView status={statusData} />;
};
