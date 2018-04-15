/**
 * Select the form store.
 *
 * @param  {Object} state Redux state
 * @return {Object}       Forms store
 */
export const selectForms = (state) => state.forms;

/**
 * Select form items.
 *
 * @param  {Object} state Redux state
 * @return {Object}       Form items
 */
export const selectFormItems = (state) => selectForms(state).items;

/**
 * Select if the form exists for this name.
 *
 * @param  {String} name  Form name
 * @param  {Object} state Redux state
 * @return {Boolean}      True if exists
 */
export const selectFormExists = (name, state) =>
  !!selectFormItems(state)[name];

/**
 * Select a form.
 *
 * @param  {String} name  Form name
 * @param  {Object} state Redux state
 * @return {Object|null}  Null if form doesn't exist
 */
export const selectForm = (name, state) =>
  selectFormExists(name, state) ?
    selectFormItems(state)[name] : null;

/**
 * Select the value for the property of the form.
 *
 * @param  {String} name     Form name
 * @param  {String} property Property name
 * @param  {Object} state    Redux state
 * @return {Mixed}           Null if form doesn't exist
 */
export const selectFormValue = (name, property, state) =>
  selectFormExists(name, state) ?
    selectForm(name, state)[property] : null;
