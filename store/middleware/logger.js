/* eslint-disable no-console */
export default function logger(store) {
  return (next) => (action) => {
    console.group(action.type);
    console.log('The prev state: ', store.getState());
    console.log('The action: ', action);
    const returnedValue = next(action);
    console.log('The new state: ', store.getState());
    console.groupEnd();
    return returnedValue;
  };
}
