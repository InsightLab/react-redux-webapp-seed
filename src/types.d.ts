type Identifiable = {
  id: string | number;
};

type TUserMe = {};

type TRoute = {
  path: string;
  component: any;
  validator?: (user: TUserMe) => boolean;
};
