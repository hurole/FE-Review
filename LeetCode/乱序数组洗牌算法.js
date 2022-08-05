/**
 *  给定一个指定长度的数组 打乱数组中的元素的顺序 洗牌算法
 */

let arr = [1, 2, 3, 4, 5];

/**
 * 洗牌算法原理 ：假设数组长度为n
 * 第一次：将第n个元素与前n个随机元素交换位置，确定下第n个位置上的元素。得到元素放在第n个位置的概率为1/n,不放在第n个位置的概率为n-1/n
 * 第二次：将第n-1个元素与前n-1个随机元素交换位置，确定下第n-1上的元素。得到剩余元素放在第n-1个位置上的概率为，(n-1/n)*(1/n-1)=1/n,
 * 不放在第n-1位置上的概率为((n-1)/n)*((n-2)/(n-1))=(n-2)/n
 * 第三次：将第n-2个元素与前n-3个随机元素交换位置，确定下第n-1上的元素。得到剩余元素放在第n-1个位置上的概率为，（n-2/n)*(1/n-2)=1/n,
 * 不放在第n-1位置上的概率为(n-2/n)*(n-3/n-2)=(n-3)/n
 * 依次类推：没个元素被放在任意位置上的概率都是1/n
 * */

function radomArray(arr) {
  // 存放用于与前面元素交换的索引，例如第一次是对第n个位置上的元素进行交换，第二次是第n-1个位置上的元素
  let index = arr.length - 1;
  // 循环终止条件就是只剩下一个元素，就不用做交换处理
  while (index > 0) {
    let temp = arr[index];
    let selectIndex = Math.floor(Math.random() * (index + 1));
    arr[index] = arr[selectIndex];
    arr[selectIndex] = temp;
    index--;
  }
  return arr;
}
let res = radomArray(arr);
console.log("res", res);
