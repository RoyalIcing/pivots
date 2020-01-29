# Pivots

## Readable [discriminated unions](https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions) for TypeScript

Problem: you have values which can be one of a possible set of types, such as actions to a reducer, or types of a value.

Let’s take an example of a desk item. It could be a lamp, a notebook of size A5 or A4, or a pen of a specific type.

You could do something like this:

```typescript
type DeskItem =
  | { type: 'lamp' }
  | { type: 'notebook'; size: 'A5' | 'A4' }
  | { type: 'pen'; penType: 'ballpoint' | 'rollerball' | 'fountain' };
```

You find this works well. The problem is when there are many type variations, which have many properties. Then legibility suffers (say after using prettier) —

```typescript
type DeskItem =
  | { type: 'lamp' }
  | { type: 'notebook'; size: 'A5' | 'A4' }
  | {
      type: 'pen';
      penType: 'ballpoint' | 'rollerball' | 'fountain';
      color: 'black' | 'blue' | 'red' | 'green';
    };
```

Wouldn’t it be nice if we could make this more readable, whilst also having a system for working with these types? Enter Pivots —

```typescript
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
```

This is the exact same type as `DeskItem`, with a union of different object types each with a distinct `type` property, yet Pivots allowed us to declare it in a much more natural manner.

We could also use to model an action to dispatch to `useReducer()`:

```typescript
export type TodoListAction = PivotsType<{
  addItem: { id: string; title: string };
  removeItem: { id: string };
  moveItem: { id: string; afterID?: string };
  completeItem: { id: string };
  uncompleteItem: { id: string };
}>;

const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: 'addItem', id: '9F8535DA', title: 'New item' });
dispatch({ type: 'completeItem', id: '9F8535DA' });
```

## Docs

Pivots exports two types:

### `PivotsType<R>`

- Takes one generic argument: the record to be transformed.

```typescript
type A = PivotsType<{
  apple: {
    color: 'green' | 'red';
  };
  orange: {
    variety: 'valencia' | 'blood';
  };
  pear: {};
}>;

type B =
  | { type: 'apple'; color: 'green' | 'red' }
  | { type: 'orange'; variety: 'valencia' | 'blood' }
  | { type: 'pear' };

// A and B are equivalent types
```

### `Pivots<B extends string, R>`

- Takes one generic argument: the key to pivot on (such as `"type"` or `"base"` or `"kind"`), and the record to be transformed.

```typescript
type Fruits<R> = Pivots<'fruit', R>;

type A = Fruits<{
  apple: {
    color: 'green' | 'red';
  };
  orange: {
    variety: 'valencia' | 'blood';
  };
  pear: {};
}>;

type B =
  | { fruit: 'apple'; color: 'green' | 'red' }
  | { fruit: 'orange'; variety: 'valencia' | 'blood' }
  | { fruit: 'pear' };

// A and B are equivalent types
```

---

## Local Development

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
