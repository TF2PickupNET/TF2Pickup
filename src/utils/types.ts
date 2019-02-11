type Keys<Obj extends object> = Array<keyof Obj>;

type Immutable<Obj> = {
  [Key in keyof Obj]: Obj[Key]
};

export {
  Keys,
  Immutable,
};
