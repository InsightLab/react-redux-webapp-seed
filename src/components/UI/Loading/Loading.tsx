type LoadingProps = {
  loadingText?: string;
};

export const Loading: React.FC<LoadingProps> = ({
  loadingText = 'Loading...',
}: LoadingProps) => {
  return <div>{loadingText}</div>;
};
