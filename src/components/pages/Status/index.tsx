import { CardManagerProvider } from '../../shared/CardManager';
import { Loading } from '../../shared';
import { useStatusState } from './State';
import { StatusView } from './View';

export const StatusPage = () => {
  const { loading: statusLoading, data: statusData } = useStatusState();

  if (statusLoading) return <Loading />;

  return (
    <CardManagerProvider>
      <StatusView status={statusData} />
    </CardManagerProvider>
  );
};
