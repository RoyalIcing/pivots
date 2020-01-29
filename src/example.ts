import { Pivots, PivotsType } from './index';

type DeskItem =
  | { type: 'lamp' }
  | { type: 'notebook'; size: 'A5' | 'A4' }
  | {
      type: 'pen';
      penType: 'ballpoint' | 'rollerball' | 'fountain';
      color: 'black' | 'blue' | 'red' | 'green';
    };

const a: DeskItem = { type: 'lamp' };
const b: DeskItem = { type: 'notebook', size: 'A4' };

type DeskItem2 = PivotsType<{
  lamp: {};
  notebook: {
    size: 'A5' | 'A4';
  };
  pen: {
    penType: 'ballpoint' | 'rollerball' | 'fountain';
    color: 'black' | 'blue' | 'red' | 'green';
  };
}>;

const z: DeskItem2 = { type: 'lamp' };
const y: DeskItem2 = { type: 'notebook', size: 'A4' };

// Actions

type Actions<R> = PivotsType<R>;

export type CounterAction = Actions<{
  reset: {};
  increment: { by: number };
  decrement: { by: number };
  multiply: { by: number };
}>;

export type TodoListAction = Actions<{
  addItem: { id: string; title: string };
  removeItem: { id: string };
  moveItem: { id: string; afterID?: string };
  completeItem: { id: string };
  uncompleteItem: { id: string };
}>;
