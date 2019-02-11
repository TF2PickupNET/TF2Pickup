interface Log {
  readonly id: string,
  readonly path: string,
  readonly message: string,
  readonly createdOn: number,
  readonly data: {},
}

export default Log;
