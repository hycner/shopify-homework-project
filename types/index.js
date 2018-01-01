export type TAccount = {
  _id: string,
  name: string,
  shopifyKey: string,
  oauthSecret: string,
  created: string,
  updated: string,
};

export type TProduct = {
  id: string,
};

// Redux
export type TDispatch = Function;
export type TGetState = () => Object;
