type Identifiable = {
  id: string | number;
};

type TUserMe = {};

type TRoute = {
  path: string;
  component: any;
  permission?: (user: TUserMe) => boolean;
};
