import { StatusContainer } from '../components/Entities/Status/Container';
import { UsersFormContainer } from '../components/Entities/Users/Form/Container';
import { UsersListContainer } from '../components/Entities/Users/List/Container';
import { NotFound, wrapSimpleScreen } from '../components/UI';
import { isAdmin, isAdminOrManager } from './validators';

export const routes: TRoute[] = [
  {
    path: '/',
    component: wrapSimpleScreen(StatusContainer),
    validator: isAdminOrManager,
  },
  {
    path: '/users',
    component: wrapSimpleScreen(UsersListContainer),
    validator: isAdminOrManager,
  },
  {
    path: '/users/(new|edit)/:id?',
    component: wrapSimpleScreen(UsersFormContainer),
    validator: isAdmin,
  },
  {
    path: '*',
    component: wrapSimpleScreen(NotFound),
  },
];
