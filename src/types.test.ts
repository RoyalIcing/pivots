import { PivotsType, PivotsOnlyTypes } from './types';

type AssertEqual<T, Expected> = T extends Expected
  ? Expected extends T
    ? true
    : never
  : never;

describe('PivotsType', () => {
  type CounterAction = PivotsType<{
    reset: {};
    increment: { by: number };
    decrement: { by: number; allowNegative: boolean };
    multiply: { by: number };
  }>;

  it("converts to union with distinct 'type' properties", () => {
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
          allowNegative: boolean;
        }
      | {
          type: 'multiply';
          by: number;
        }
    > = true;
    expect(works).toBe(true);
  });
});

describe('PivotsOnlyTypes', () => {
  type Actions<R> = PivotsType<R>;

  type CounterAction = Actions<{
    reset: {};
    increment: { by: number };
    decrement: { by: number; allowNegative: boolean };
  }>;

  it('extracts the increment case', () => {
    const works: AssertEqual<
      PivotsOnlyTypes<CounterAction, 'increment'>,
      {
        type: 'increment';
        by: number;
      }
    > = true;
    expect(works).toBe(true);
  });

  it('extracts the reset and decrement cases', () => {
    const works: AssertEqual<
      PivotsOnlyTypes<CounterAction, 'reset' | 'decrement'>,
      | {
          type: 'reset';
        }
      | {
          type: 'decrement';
          by: number;
          allowNegative: boolean;
        }
    > = true;
    expect(works).toBe(true);
  });
});
