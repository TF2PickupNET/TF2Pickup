type Validator<Val> = [
  (val: Val) => boolean,
  string
];

export { Validator };
