export type Pivots<K extends string, R> = {
  [P in keyof R]: { [L in K]: P } & R[P];
}[keyof R];

type PivotsCase<B extends string, T, U = {}> = { [P in B]: T } & U;

export type PivotsOnly<
  K extends string,
  Union extends PivotsCase<K, any>,
  Cases extends Union[K]
> = Extract<Union, { [L in K]: Cases }>;

// #type

export type PivotsType<R> = Pivots<'type', R>;
type PivotsTypeCase<T, U = {}> = PivotsCase<'type', T, U>;

export type PivotsOnlyTypes<
  Union extends PivotsTypeCase<any>,
  Types extends Union['type']
> = PivotsOnly<'type', Union, Types>;
