import React from 'react';

export type SimpleScreenOptions = {
  title?: string;
  description?: string;
  padding?: number;
  large?: boolean;
};

export type SimpleScreenProps = {
  options?: SimpleScreenOptions;
};

export const SimpleScreen: React.FC<SimpleScreenProps> = ({
  options,
  children,
}) => {
  return <div>{children}</div>;
};

export function wrapSimpleScreen(
  Component: React.FC<{}>,
  options?: SimpleScreenOptions
): React.ComponentType<any> {
  return () => (
    <SimpleScreen options={options}>
      <Component />
    </SimpleScreen>
  );
}