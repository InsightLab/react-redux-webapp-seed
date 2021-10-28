import * as pages from './components/Pages';
import { wrapDefaultPageLayout } from './components/Layout';
import { isAdmin, isAdminOrManager } from './validators';

export const routes: TRoute[] = [
  {
    path: '/',
    component: wrapDefaultPageLayout(pages.StatusPage),
    validator: isAdminOrManager,
  },
  {
    path: '/users',
    component: wrapDefaultPageLayout(pages.UsersListPage),
    validator: isAdminOrManager,
  },
  {
    path: '/users/(new|edit)/:id?',
    component: wrapDefaultPageLayout(pages.UsersFormPage),
    validator: isAdmin,
  },
  {
    path: '*',
    component: wrapDefaultPageLayout(pages.NotFoundPage),
  },
];
