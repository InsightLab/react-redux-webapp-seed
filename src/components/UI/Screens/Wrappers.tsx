import { SimpleScreen, SimpleScreenOptions } from './SimpleScreen';

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
