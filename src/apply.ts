export function applyType<
  Type extends string,
  Params extends {},
  Args extends Array<any>,
  Result extends any,
  Receivers extends Record<
    Type,
    (this: null, params: { type: Type } & Params, ...args: Args) => Result
  >
>(
  receivers: Receivers,
  action: { type: Type } & Params,
  ...args: Args
): Result {
  const func = receivers[action.type] as (this: null, ...args: any) => Result;

  return func.call(null, action, ...args);
}
