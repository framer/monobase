export const css = function() {};

export const styled = new Proxy(
  {},
  {
    get(target, name) {
      return function() {};
    }
  }
);
