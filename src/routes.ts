import * as pages from './components/pages';
import { wrapDefaultPageLayout } from './components/layout';
import { isAdmin, isAdminOrManager } from './permissions';

export const routes: TRoute[] = [
  {
    path: '/',
    component: wrapDefaultPageLayout(pages.StatusPage),
    permission: isAdminOrManager,
  },
  {
    path: '/users',
    component: wrapDefaultPageLayout(pages.UsersListPage),
    permission: isAdminOrManager,
  },
  {
    path: '/users/(new|edit)/:id?',
    component: wrapDefaultPageLayout(pages.UsersFormPage),
    permission: isAdmin,
  },
  {
    path: '*',
    component: wrapDefaultPageLayout(pages.NotFoundPage),
  },
];
