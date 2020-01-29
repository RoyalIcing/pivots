import { PivotsType } from '../src';

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
