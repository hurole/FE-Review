const { expect } = require('@jest/globals');
const quickSort = require('./快速排序');

test('快速排序', () => {
  expect(quickSort([1, 2, 3, 5, 8, 4, 11, 0, 3])).toEqual([0, 1, 2, 3, 3, 4, 5, 8, 11]);
});
