import { useLocation } from 'react-router';
import { NotFoundView } from './View';

export function NotFoundPage() {
  const { pathname } = useLocation();

  return <NotFoundView pathname={pathname} />;
}
