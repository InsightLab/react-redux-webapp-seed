import {
  DefaultPageLayout,
  DefaultPageLayoutOptions,
} from './DefaultPageLayout';

export function wrapDefaultPageLayout(
  Component: React.FC<{}>,
  options?: DefaultPageLayoutOptions
): React.ComponentType<any> {
  return () => (
    <DefaultPageLayout options={options}>
      <Component />
    </DefaultPageLayout>
  );
}
