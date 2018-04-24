import { selectUser } from './users';

export const selectFlags = (state) => state.flag;

export const selectFlagItems = (state) => state.flag.items;

export const selectFlagExists = (flagId, state) =>
  !!selectFlagItems(state)[flagId] &&
  !!selectFlagItems(state)[flagId].id;

export const selectFlagById = (flagId, state) =>
selectFlagExists(flagId, state) ? ({
  ...selectFlagItems(state)[flagId],
  judge: selectUser(selectFlagItems(state)[flagId].judge, state) ||
    selectFlagItems(state)[flagId].judge || null,
}) : null;

// TODO: selectFlagTarget
