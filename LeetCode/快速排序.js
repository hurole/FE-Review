/**
 * @description 快速排序 时间复杂度 O(nlog2n)
 * @param {Array} arr
 */
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  // 左分区
  let left = [],
    // 右分区
    right = [],
    // 基准索引
    pivotIndex = Math.floor((arr.length - 1) / 2),
    // 将基准从数组中取出
    pivot = arr.splice(pivotIndex, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > pivot) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}
module.exports = quickSort;
