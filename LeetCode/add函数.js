// 实现1.add(2).add(3) 返回6

Number.prototype.add = function (num) {
  return this + num;
};
// 测试
let s = (1).add(2).add(3);
console.log(s);
