import { PivotsType } from './types';

type AssertEqual<T, Expected> = T extends Expected
  ? Expected extends T
    ? true
    : never
  : never;

describe('PivotsType', () => {
  type Actions<R> = PivotsType<R>;

  type CounterAction = Actions<{
    reset: {};
    increment: { by: number };
    decrement: { by: number };
    multiply: { by: number };
  }>;

  const works: AssertEqual<
    CounterAction,
    | {
        type: 'reset';
      }
    | {
        type: 'increment';
        by: number;
      }
    | {
        type: 'decrement';
        by: number;
      }
    | {
        type: 'multiply';
        by: number;
      }
  > = true;
  
  it("converts to union with distinct 'type' properties", () => {
    expect(works).toBe(true);
  })
});
