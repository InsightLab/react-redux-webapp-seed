type Identifiable = {
  id: string | number;
};

type UserMe = {};

type TRoute = {
  path: string;
  component: any;
  validator?: (user: UserMe) => boolean;
};
