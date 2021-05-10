/**
 * 问题：声明一个函数primeNumber让它每次执行返回一个质数（素数）；
 * ---------------------------------------------------------------
 * 例如：
 * primeNumber(); //2
 * primeNumber(); //3
 * primeNumber(); //5
 * ...
 * ---------------------------------------------------------------
 * 
 * 质数：在大于1的自然数中，除了1和它本身不再有其他因数的自然数。
 * */


/**
 * @description 判断是否为质数
 * */
function isPrime(num) {
    // 声明一个计数器 保存因数个数
    let s = 0;
    // 从1-num，判断每个数是否为num的因数，如果是计数器s+1
    for (let i = 1; i <= num; i++) {
        if (num % i === 0) {
            s++;
        }
    }
    // 遍历后 因数个数等于2 那么证明为质数，即1和num本身这两个数
    if (s === 2) {
        return true;
    }
    return false;
}
// 形成闭包 保存n=2
function foo() {
    // 质数是大于1的自然数，所以从2开始
    let n = 2;
    // 返回函数 闭包保存n
    return function () {
        while (true) {
            if (isPrime(n)) {
                // 为质数直接返回 n加1，将下一个自然数保存到n变量中
                return n++;
            }
            // 不为质数，变量n也加1，方便下一次判断
            n++;
        }
    }
}
let primeNumber = foo();

// 测试
console.log(primeNumber()); //2
console.log(primeNumber()); //3
console.log(primeNumber()); //5
console.log(primeNumber()); //7
console.log(primeNumber()); //11
console.log(primeNumber()); //13
console.log(primeNumber()); //17