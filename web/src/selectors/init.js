export const selectInit = (state) => state.init;

export const selectInitValue = (key, state) => selectInit(state)[key];
