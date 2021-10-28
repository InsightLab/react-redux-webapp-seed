export const isAdmin = (user: TUserMe): boolean => true;
export const isManager = (user: TUserMe): boolean => false;

export const isAdminOrManager = (user: TUserMe) =>
  isAdmin(user) || isManager(user);
