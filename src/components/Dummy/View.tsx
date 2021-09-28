import { isApiError } from '../../services/resources';
import { Card, Status } from './styles';

type DummyProps = {
  loading?: boolean;
  error?: SagaError | ApiError | null;
  data: ApiDummySample | {};
};

export const Dummy = ({ data, loading, error }: DummyProps) => {
  let text = '';

  if (loading) {
    text = 'Loading...';
  } else if (error) {
    text = `Ops! Service error!`;
    if (isApiError(error)) {
      text = JSON.stringify(error.data);
    }
  } else if ('status' in data) {
    text = data.status;
  }

  return (
    <Card>
      <Status>{text}</Status>
    </Card>
  );
};
