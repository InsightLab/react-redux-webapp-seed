import React from 'react';

export type DefaultPageLayoutOptions = {
  title?: string;
  description?: string;
  padding?: number;
  large?: boolean;
};

export type DefaultPageLayoutProps = {
  options?: DefaultPageLayoutOptions;
};

export const DefaultPageLayout: React.FC<DefaultPageLayoutProps> = ({
  options,
  children,
}) => {
  return <div>{children}</div>;
};
