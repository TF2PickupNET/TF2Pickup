// eslint-disable-line max-lines
// @flow strict-local

declare module 'mongoose' {
  declare export class BsonObjectId {
    constructor(id?: string | number | BsonObjectId): this,
    generationTime: number,
    static createFromHexString(hexString: string): BsonObjectId,
    static createFromTime(time: number): BsonObjectId,
    static isValid(id?: string | number | BsonObjectId | null | void): boolean,
    equals(otherID: BsonObjectId): boolean,
    generate(time?: number): string,
    getTimestamp(): Date,
    toHexString(): string,
    toString(): string,
    inspect(): string,
    toJSON(): string,
  }

  declare export class BsonDecimal128 {
    constructor(bytes: Buffer): this,
    static fromString(string: string): BsonDecimal128,
    toString(): string,
    toJSON(): { $numberDecimal: string },
  }

  declare export type MongoId = BsonObjectId | string | number;

  declare export type MongooseTypes = {|
    ObjectId: Class<BsonObjectId>,
    Mixed: {},
    Array: {},
    Buffer: {},
    Decimal128: Class<BsonDecimal128>,
  |};

  // eslint-disable-next-line flowtype/no-primitive-constructor-types
  declare export type SchemaTypes = String
    // eslint-disable-next-line flowtype/no-primitive-constructor-types
    | Number
    // eslint-disable-next-line flowtype/no-primitive-constructor-types
    | Boolean
    | Date
    | $Values<MongooseTypes>
    | [SchemaTypes];

  declare export type SchemaFieldOptions = {|
    type: SchemaTypes,
    default?: mixed | () => mixed,
    validate?: () => boolean,
    required: boolean | () => boolean,
    index?: boolean,
    unique?: boolean,
    sparse?: boolean,
    lowercase?: boolean,
    uppercase?: boolean,
    trim?: boolean,
    match?: RegExp,
    enum?: $ReadOnlyArray<mixed>,
    minLength?: number,
    maxLength?: number,
    min?: number | Date,
    max?: number | Date,
  |};

  declare export type SchemaFields<Doc> = {
    [fieldName: string]: SchemaTypes
      | SchemaFieldOptions
      | [SchemaFieldOptions]
      | SchemaFields<Doc>
      | [SchemaFields<Doc>]
      | Schema<Doc>
      | [Schema<Doc>],
  };

  declare export type ConnectionOptions = {
    user?: string,
    pass?: string,
    autoIndex?: boolean,
    bufferCommands?: boolean,
  };

  declare export type GeoSearchOptions = {
    near: [number, number],
    maxDistance: number,
    limit?: number,
    lean?: boolean,
  };

  declare export type SchemaOptions = {
    autoIndex?: boolean,
    bufferCommands?: boolean,
    capped?: boolean,
    collection?: string,
    id?: boolean,
    _id?: boolean,
    minimize?: boolean,
    read?: string,
    safe?: boolean,
    shardKey?: boolean,
    strict?: boolean,
    toJSON?: {},
    toObject?: {},
    typeKey?: string,
    useNestedStrict?: boolean,
    validateBeforeSave?: boolean,
    versionKey?: string,
    collation?: {},
  };

  declare export type SortOptions = 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;

  declare export class Error {
    constructor(message: string): this,
    static CastError: Error,
    static DivergentArrayError: Error,
    static DocumentNotFoundError: Error,
    static MissingSchemaError: Error,
    static OverwriteModelError: Error,
    static ParallelSaveError: Error,
    static ValidationError: Error,
    static ValidatorError: Error,
    static VersionError: Error,
    static messages: {},
  }

  declare export class Collection {
    constructor(name: string, connection: Connection, options?: {}): this,
    name: string,
    connection: Connection,
    collectionName: string,
  }

  declare export class VirtualType {
    constructor(): this,
    applyGetters(value: {}, scope: {}): mixed,
    applySetters(value: {}, scope: {}): mixed,
    get(() => mixed): this,
    set(() => void): this,
  }

  declare export class Schema<Doc> {
    static Types: MongooseTypes,
    constructor(definition: SchemaFields<Doc>, options?: SchemaOptions): this,
    obj: {},
    childSchemas: $ReadOnlyArray<{
      model: Model<Doc>,
      schema: Schema<Doc>,
    }>,
    add(obj: {}, prefix?: string): void,
    clone(): Schema<Doc>,
    eachPath(fn: () => void): this,
    get(key: string): mixed,
    index(fields: {}, options?: {}): void,
    indexes(): $ReadOnlyArray<string>,
    loadClass(model: Model<Doc>, virtualsOnly?: boolean): void,
    method(name: string, fn: () => void): void,
    method(obj: { [key: string]: () => void }): void,
    path(path: string): SchemaType,
    path(path: string, type: SchemaTypes): void,
    pathType(path: string): string,
    plugin(fn: () => void, options?: {}): void,
    post(name: string, fn: (doc: {} | $ReadOnlyArray<{}>) => void): void,
    pre(name: string, fn: (next: () => void) => void): void,
    queue(name: string, ...args: $ReadOnlyArray<mixed>): void,
    remove(path: string | $ReadOnlyArray<string>): void,
    requiredPaths(invalidate: boolean): $ReadOnlyArray<string>,
    set(key: string): mixed,
    set(key: string, value: mixed): void,
    static(name: string, fn: (...args: $ReadOnlyArray<mixed>) => void): void,
    static(obj: { [key: string]: (...args: $ReadOnlyArray<mixed>) => void }): void,
    virtual(name: string, options?: {}): VirtualType,
    virtualPath(name: string): VirtualType,
  }

  declare export class Connection {
    name: string,
    pass: string,
    port: number,
    host: string,
    user: string,
    readyState: 0 | 1 | 2 | 3,
    config: {},
    collections: $ReadOnlyArray<Collection>,
    constructor(mongoose: Mongoose): this,
    close(force?: boolean): this,
    collection(name: string): Collection,
    createCollection(name: string): Promise<Collection>,
    dropCollection(name: string): Promise<void>,
    dropDatabase(): Promise<void>,
    model<Doc>(name: string, schema: Schema<Doc>, collectionName?: string): Model<Doc>,
    model<Doc>(name: string): Model<Doc>,
    modelNames(): $ReadOnlyArray<string>,
    on('disconnected', func: () => void): void,
    on('connected', func: () => void): void,
    on('connecting', func: () => void): void,
    on('disconnecting', func: () => void): void,
    on(eventName: string, func: () => void): void,
    useDb(name: string): Connection,
  }

  declare export class Document<Doc> {
    isNew: boolean,
    schema: Schema<Doc>,
    id: string,
    errors: {},
    $ignore(path: string): void,
    $isDefault(path?: string): boolean,
    $isDeleted(val?: boolean): boolean,
    $markValid(path: string): void,
    $session(session?: {}): {},
    $set(path: string, val: mixed, type?: SchemaTypes, options?: {}): void,
    $set(path: {}, type?: SchemaTypes, options?: {}): void,
    depopulate(path: string): this,
    equals<OtherDoc>(doc: Document<OtherDoc>): boolean,
    execPopulate(): Promise<this>,
    get(path: string, type?: SchemaTypes): mixed,
    init(doc: {}): void,
    inspect(): void,
    invalidate(
      path: string,
      errorMsg: string | Error,
      value: mixed,
      kind: string,
    ): Error,
    isDirectModified(path: string): boolean,
    isDirectSelected(path: string): boolean,
    isInit(path: string): boolean,
    isModified(path?: string): boolean,
    isSelected(path: string): boolean,
    markModified(path: string, scope: Document<Doc>): void,
    modifiedPaths(options?: { includeChildren: boolean }): $ReadOnlyArray<string>,
    populate(path: string | {}): this,
    populated(path: string): BsonObjectId | string | number | Buffer | void | $ReadOnlyArray<mixed>,
    save(options?: {}): Promise<this>,
    set(path: string, val: mixed, type?: SchemaTypes, options?: {}): void,
    set(path: {}, type?: SchemaTypes, options?: {}): void,
    toJSON(options?: {}): {},
    toObject(options?: {}): {},
    toString(): string,
    unmarkModified(path: string): void,
    update(doc: {}, options: {}): Query<Doc>,
    validate(options?: {}): Promise<Error | void>,
    validateSync(pathsToValidate: string | $ReadOnlyArray<string>): Error | void,
  }

  declare export class Model<Doc> {
    static aggregate(pipeline?: $ReadOnlyArray<{}>): Aggregate,
    static bulkWrite(operations: $ReadOnlyArray<{}>): Promise<void>,
    static count(conditions: {}): Query<Doc>,
    static create(docs: $ReadOnlyArray<Doc>): Promise<$ReadOnlyArray<Doc>>,
    static create(...docs: $ReadOnlyArray<Doc>): Promise<$ReadOnlyArray<Doc>>,
    static createIndexes(options: {}): Promise<void>,
    static deleteMany(conditions: {}): Query<Doc>,
    static deleteOne(conditions: {}): Query<Doc>,
    static discriminator(name: string, schema: Schema<Doc>, value: string): void,
    static distinct(field: string, conditions?: {}): Query<Doc>,
    static ensureIndexes(options?: {}): Promise<void>,
    static find(conditions: {}, projection?: {} | string, options?: {}): Query<Doc>,
    static findById(id: MongoId, projection?: {} | string, options?: {}): Query<Doc>,
    static findByIdAndDelete(id: MongoId, options?: {}): Query<Doc>,
    static findByIdAndRemove(id: MongoId, options?: {}): Query<Doc>,
    static findByIdAndUpdate(id: MongoId, update: {}, options: {}): Query<Doc>,
    static findOne(conditions: {}, projection?: {} | string, options?: {}): Query<Doc>,
    static findOneAndDelete(conditions: {}, options?: {}): Query<Doc>,
    static findOneAndRemove(conditions: {}, options?: {}): Query<Doc>,
    static findOneAndUpdate(conditions: {}, update: {}, options?: {}): Query<Doc>,
    static geoSearch(conditions: {}, options: GeoSearchOptions): Promise<$ReadOnlyArray<Doc>>,
    static hydrate<O>(obj: O): Model<O>,
    static init(): Promise<Model<Doc>>,
    static insertMany(doc: Doc, options?: {}): Promise<Doc>,
    static insertMany(doc: $ReadOnlyArray<Doc>, options?: {}): Promise<$ReadOnlyArray<Doc>>,
    static populate(doc: Doc, options: {}): Promise<Doc>,
    static populate(doc: $ReadOnlyArray<Doc>, options: {}): Promise<$ReadOnlyArray<Doc>>,
    static remove(conditions: {}): Query<Doc>,
    static replaceOne(conditions: {}, doc: Doc, options?: {}): Query<Doc>,
    static session(options?: {}): Promise<{}>,
    static translateAliases(raw: {}): {},
    static update(conditions: {}, doc: Doc, options?: {}): Query<Doc>,
    static updateMany(conditions: {}, doc: Doc, options?: {}): Query<Doc>,
    static updateOne(conditions: {}, doc: Doc, options?: {}): Query<Doc>,
    static watch(): {},
    static where(path: string, val?: {}): Query<Doc>,

    constructor(doc: Doc): this,
    base: Mongoose,
    baseModelName?: string,
    collection: Collection,
    modelName: string,
    schema: Schema<Doc>,
    $where(argument: string | () => boolean): Query<Doc>,
    model(name: string): Model<Doc>,
    increment(): void,
    remove(): Promise<Doc>,
    save(): Promise<Doc>,
  }

  declare export class QueryCursor<Doc> {
    on(type: 'data', cb: (doc: Doc) => void): this,
    on(type: 'end', cb: () => void): this,
    next(): Promise<Doc>,
  }

  declare export class Query<Doc> {
    constructor(options?: {}, model?: Model<Doc>, conditions?: {}, collection?: Collection): this,
    $where(js: string | () => boolean): this,
    all(path: string, val: number): this,
    all(val: number): this,
    and(conditions: $ReadOnlyArray<{}>): this,
    batchSize(val: number): void,
    box(val: {
      ll: [number, number],
      ur: [number, number],
    }): this,
    box(ll: [number, number], ur: [number, number]): this,
    cast(model: Model<Doc>, obj?: {}): {},
    catch(reject: (err: Error) => void): Promise<Error>,
    circle(path: string, area: {}): this,
    circle(area: {}): this,
    collation(value: {}): this,
    comment(val: string): this,
    count(conditions?: {}): this,
    cursor(options?: {}): QueryCursor<Doc>,
    deleteMany(conditions?: {}): this,
    deleteOne(condition?: {}): this,
    distinct(filed?: string, conditions?: {}): this,
    elemMatch(path: string, condition: {}): this,
    elemMatch(condition: {}): this,
    elemMatch(path: string, condition: (elem: Query<Doc>) => void): this,
    elemMatch(condition: (elem: Query<Doc>) => void): this,
    equals(val: mixed): this,
    exec(operation?: string): Promise<Doc | $ReadOnlyArray<Doc>>,
    error(): Error,
    error(error: Error | null): void,
    exists(path: string, val?: boolean): this,
    exists(val?: boolean): this,
    find(condition?: {}): this,
    findOne(condition?: {}, projection?: {}, options?: {}): this,
    findOneAndDelete(condition?: {}, options?: {}): this,
    findOneAndRemove(condition?: {}, options?: {}): this,
    findOneAndUpdate(query: {} | Query<Doc>, doc: {}, options?: {}): this,
    geometry(options: {
      type: string,
      coordinates: $ReadOnlyArray<[number, number]>,
    }): this,
    getQuery(): {},
    getUpdate(): {},
    gt(path: string, val: number): this,
    gt(val: number): this,
    gte(path: string, val: number): this,
    gte(val: number): this,
    hint(hints: {}): this,
    in(path: string, values: $ReadOnlyArray<mixed>): this,
    in(values: $ReadOnlyArray<mixed>): this,
    intersects(options: {
      type: string,
      coordinates: $ReadOnlyArray<[number, number]>,
    }): this,
    lean(): boolean,
    lean(val: boolean): this,
    limit(value: number): this,
    lt(path: string, val: number): this,
    lte(val: number): this,
    maxScan(value: number): this,
    merge(conditions: {} | Query<Doc>): this,
    mod(path: string, val: [number, number]): this,
    mod(val: [number, number]): this,
    mongooseOptions(): {},
    mongooseOptions(obj: {}): this,
    ne(path: string, val: number): this,
    ne(val: number): this,
    near(path: string, options?: {}): this,
    near(options?: {}): this,
    nin(path: string, values: $ReadOnlyArray<mixed>): this,
    nin(values: $ReadOnlyArray<mixed>): this,
    nor(conditions: $ReadOnlyArray<{}>): this,
    or(conditions: $ReadOnlyArray<{}>): this,
    polygon(path: string, coords: $ReadOnlyArray<[number, number]>): this,
    polygon(coords: $ReadOnlyArray<[number, number]>): this,
    populate(
      path: string,
      select?: string | {},
      model?: Model<Doc>,
      match?: {},
      options?: {},
    ): this,
    populate(options: {
      path: string,
      select?: string | {},
      model?: Model<Doc>,
      match?: {},
      options?: {},
    }): this,
    read(pref: string): this,
    regex(path: string, regex: string | RegExp): this,
    regex(regex: string | RegExp): this,
    remove(condition: {} | Query<Doc>): this,
    replaceOne(condition: {}, doc: Doc, options?: {}): this,
    select(arg: string | { [key: string]: 0 | 1 }): this,
    selected(): boolean,
    selectedExclusively(): boolean,
    selectedInclusively(): boolean,
    setOptions(options: {}): this,
    size(path: string, val: number): this,
    size(val: number): this,
    skip(val: number): this,
    slice(path: string, val: number | [number, number]): this,
    slice(val: number | [number, number]): this,
    snapshot(): this,
    sort(arg: string | { [key: string]: SortOptions }): this,
    tailable(bool: boolean, options?: {}): this,
    then(
      resolve: (Doc | $ReadOnlyArray<Doc>) => void,
      reject: (error: Error) => void,
    ): Promise<Doc | $ReadOnlyArray<Doc>>,
    toConstructor(): Query<Doc>,
    update(condition: {}, doc: {}, options?: {}): this,
    updateMany(condition: {}, doc: {}, options: {}): this,
    updateOne(condition: {}, doc: {}, options: {}): this,
    where(path: string): this,
    where(obj: {}): this,
    where(path: string, val: mixed): this,
    within(options?: {}): this,
  }

  declare export class Aggregate {

  }

  declare export class SchemaType {
    constructor(path: string, options?: {}, instance?: string): this,
    default<V>(val: V | () => V): V,
    get<V, R>(fn: (val: V) => R): this,
    index(options: {} | boolean | string): this,
    required(required: boolean, message?: string): this,
    required(options: {
      isRequired?: boolean | () => boolean,
      ErrorConstructor: (props: {}) => Error,
    }, message?: string): this,
    required(required: () => boolean, message?: string): this,
    select(val: boolean): this,
    set<V, R>(fn: (val: V) => R): this,
    sparse(bool: boolean): this,
    text(bool: boolean): this,
    unique(bool: boolean): this,
    validate(regex: RegExp, errorMsg?: string, type?: string): this,
    validate<V>(fn: (val: V) => boolean, errorMsg?: string, type?: string): this,
    validate<V>(obj: {
      validator: (val: V) => boolean,
      msg?: string,
    }, errorMsg?: string, type?: string): this,
  }

  declare export function model<Doc>(
    name: string,
    schema: Schema<Doc>,
    collection?: string,
    skipInit?: boolean,
  ): Model<Doc>;

  declare interface Mongoose {
    Types: MongooseTypes,
    Promise: Promise<mixed>,
    connection: Connection,
    version: string,
    Aggregate: Aggregate,
    Collection: Collection,
    Mongoose: Mongoose,
    VirtualType: VirtualType,
    Schema: typeof Schema,
    connect(uri: string, options?: ConnectionOptions): Promise<Mongoose>,
    disconnect(): Promise<void>,
    createConnection(uri: string, options?: ConnectionOptions): Promise<Connection>,
    set(key: string, value: mixed): void,
    get(key: string): mixed,
    modelNames(): $ReadOnlyArray<string>,
    model<Doc>(
      name: string,
      schema: Schema<Doc>,
      collection?: string,
      skipInit?: boolean,
    ): Model<Doc>,
    model<Doc>(name: string): Model<Doc>,
  }

  declare export default Mongoose;
}
