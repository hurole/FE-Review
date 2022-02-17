/**
 * @description 发红包 给总金额和红包数量 输出每个红包金额
 * @param {Number} amount 总金额
 * @param {Number} count 红包数量
 * @returns {Array<Number>}
 */
// 分段方式，把总金额想成一条线段，中间切count-1刀就可以分成count段
function getMoney(amount, count) {
    // 元转分
  let money = amount * 100;
  // 记录切段位置：将端点放入，方便后面统计
  let splitLine = [0, money];
    // 当数组长度=切端次数+端点数 就不再切段
  while (splitLine.length < count + 1) {
    let item = Math.floor(money * Math.random());
    // 如果切点位置发生成重复，那么重新随机生成切点
    if (!splitLine.some((el) => item === el)) {
      splitLine.push(item);
    }
  }
  let resSplitLine = splitLine.sort((a, b) => a - b);
  let result = [];
  for (let i = 0; i < resSplitLine.length - 1; i++) {
    result.push(resSplitLine[i + 1] - resSplitLine[i]);
  }
  return result.map((item) => item / 100);
}
let res = getMoney(10, 5);
