import { wrapDefaultLayout as wrapDefaultPageLayout } from './components/Layout';
import { NotFoundPage } from './components/Pages/NotFound';
import { StatusPage } from './components/Pages/Status';
import { UsersFormPage } from './components/Pages/Users/Form';
import { UsersListPage } from './components/Pages/Users/List';
import { isAdmin, isAdminOrManager } from './validators';

export const routes: TRoute[] = [
  {
    path: '/',
    component: wrapDefaultPageLayout(StatusPage),
    validator: isAdminOrManager,
  },
  {
    path: '/users',
    component: wrapDefaultPageLayout(UsersListPage),
    validator: isAdminOrManager,
  },
  {
    path: '/users/(new|edit)/:id?',
    component: wrapDefaultPageLayout(UsersFormPage),
    validator: isAdmin,
  },
  {
    path: '*',
    component: wrapDefaultPageLayout(NotFoundPage),
  },
];
