const { expect } = require('@jest/globals');
const bubbleSort = require('./冒泡排序');

test('冒泡排序测试', () => {
  expect(bubbleSort([3, 2, 1, 0, 5])).toEqual([0, 1, 2, 3, 5]);
  expect(bubbleSort([9, 8, 7, 6, 5])).toEqual([5, 6, 7, 8, 9]);
});
