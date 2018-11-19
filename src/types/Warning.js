// @flow

type Warning = {|
  _id: string,
  from: string,
  for: string,
  message: string,
  read: boolean,
  createdOn: Date,
  readOn: Date,
|};

export type { Warning };
