import { LoadingText } from './index.styled';

type LoadingProps = {
  loadingText?: string;
};

export const Loading: React.FC<LoadingProps> = ({
  loadingText = 'Loading...',
}: LoadingProps) => {
  return <LoadingText>{loadingText}</LoadingText>;
};
