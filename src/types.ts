export type TSocketResponse = {
  status: {
    ok: boolean;
  };
};

export type TSucessResponseDataType<T, K extends string | number | symbol> = {
  [key in K]: T;
} & {
  cursor?: string;
};
