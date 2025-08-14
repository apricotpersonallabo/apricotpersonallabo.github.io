const createStore = (reducer, initial) => {
  let state = initial;
  const subs = new Set();
  return {
    get: () => state,
    subscribe: (fn) => (subs.add(fn), () => subs.delete(fn)),
    dispatch: (action) => {
      const next = reducer(state, action);
      if (next !== state) {
        state = next;
        subs.forEach(fn => fn(state, action));
      }
    }
  };
};
const reducer = (state, action) => {
  switch(action.type){
    case "SET_LOCALE":
      return { ...state, locale: action.locale };
    default:
      return state;
  }
};
export const initStore = (initial) => createStore(reducer, initial);
