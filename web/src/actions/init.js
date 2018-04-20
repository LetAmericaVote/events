export const SET_INIT_VALUE = 'SET_INIT_VALUE';

export function setInitValue(key, value) {
  return { type: SET_INIT_VALUE, key, value };
}
