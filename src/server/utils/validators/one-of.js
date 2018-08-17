// @flow

type Options = {
  msg?: string,
  nullIsAllowed?: boolean,
};

export default function oneOf<T>(array: $ReadOnlyArray<T>, {
  msg = '{VALUE} is not in the Array!',
  nullIsAllowed = false,
}: Options) {
  return [
    (value: T) => array.includes(value) || (nullIsAllowed && value === null),
    msg,
  ];
}
