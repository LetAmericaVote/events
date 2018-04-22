/**
 * Reduce a flat array of data into batches of 25 item arrays
 *
 * @param  {Array} items  Array of data
 * @return {Array<Array>} Array of batches
 */
export function batchItems(items) {
  return items.reduce((acc, val, index) => {
    const batch = Math.floor(index / 25);
    if (! acc[batch]) {
      acc[batch] = [];
    }

    acc[batch].push(val);

    return acc;
  }, []);
}
