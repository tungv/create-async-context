import { AsyncLocalStorage } from "async_hooks";

export default function createAsyncContext<ContextType>(
  defaultValue?: ContextType,
) {
  const asyncLocalStorage = new AsyncLocalStorage<ContextType>();

  return [provide, getValue] as const;

  function provide(value: ContextType, scope: (value: ContextType) => any) {
    return asyncLocalStorage.run(value, () => scope(value));
  }

  function getValue(): ContextType | undefined {
    return asyncLocalStorage.getStore() || defaultValue;
  }
}
