export const isAdmin = (user: UserMe): boolean => true;
export const isManager = (user: UserMe): boolean => false;

export const isAdminOrManager = (user: UserMe) =>
  isAdmin(user) || isManager(user);
