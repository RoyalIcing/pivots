import { PivotsType } from './index';
import { applyType } from './apply';

function fresh<T>(maker: () => T, refresher: (object: T) => void): T {
  let result = maker();
  afterEach(() => {
    refresher(result);
  });
  return result;
}

describe('applyType()', () => {
  const methods = {
    noop: fresh(jest.fn, mock => mock.mockReset()),
    multiplyBy({ factor }: { factor: number }, n: number): number {
      return n * factor;
    },
  };

  type Action = PivotsType<{
    noop: {};
    multiplyBy: { factor: number };
  }>;

  describe('calling noop', () => {
    beforeEach(() => {
      const action: Action = { type: 'noop' };
      applyType(methods, action, 3);
    });

    it('calls the correct function', () => {
      expect(methods.noop).toHaveBeenCalledTimes(1);
    });

    it('passes along the extra argument', () => {
      expect(methods.noop).toHaveBeenCalledWith({ type: 'noop' }, 3);
    });
  });

  describe('calling multiplyBy', () => {
    const action: Action = { type: 'multiplyBy', factor: 7 };

    it('returns the correct result', () => {
      const result = applyType(methods, action, 3);
      expect(result).toEqual(21);
    });
  });
});
