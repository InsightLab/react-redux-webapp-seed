type UserMe = {};

type TRoute = {
  path: string;
  component: any;
  validator?: (user: UserMe) => boolean;
};
