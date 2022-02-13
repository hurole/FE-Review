/**
 * @description 冒泡排序 时间复杂度 O(n^2)
 */
function bubbleSort(arr) {
  let len = arr.length;
  let temp;
  if (len < 2) {
    return arr;
  }
  for (let i = 0; i < len - 1; len--) {
    for (let j = 0; j < len - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
module.exports = bubbleSort;