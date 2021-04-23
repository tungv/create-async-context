import createAsyncContext from "../create-async-context";

test("getValue should return default value if nothing is provided", (done) => {
  const [provide, getValue] = createAsyncContext({ a: 1 });

  process.nextTick(() => {
    expect(getValue()).toEqual({ a: 1 });
    done();
  });
});

test("getValue should return provided value", (done) => {
  const [provide, getValue] = createAsyncContext<{ a: number }>();

  provide({ a: 2 }, () => {
    process.nextTick(() => {
      expect(getValue()).toEqual({ a: 2 });
      done();
    });
  });
});
