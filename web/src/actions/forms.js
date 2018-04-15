export const SET_FORM_VALUE = 'SET_FORM_VALUE';

/**
 * Set the value for the property of a form.
 *
 * @param {String} formName Form name
 * @param {String} property Property name
 * @param {Mixed} value     Form property Value
 */
export function setFormValue(formName, property, value) {
  return { type: SET_FORM_VALUE, formName, property, value };
}
