// type Pivot<B extends string, T, U = {}> = { [P in B]: T } & U;
// type PivotType<T, U = {}> = Pivot<'type', T, U>;

export type Pivots<K extends string, R> = {
  [P in keyof R]: { [L in K]: P } & R[P];
}[keyof R];

export type PivotsType<R> = Pivots<'type', R>;
