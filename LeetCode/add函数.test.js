const { expect } = require('@jest/globals');
require('./add函数');

test("测试add函数",()=>{
  expect((1).add(2).add(3)).toBe(6);
  expect((2).add(2).add(2).add(2).add(2)).toBe(10);
})