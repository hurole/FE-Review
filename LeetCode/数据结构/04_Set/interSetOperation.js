/**
 * @description 集合间的操作,js内部已经实现了集合，Set内部类
 */

/**
 * @description 求并集
 * @param {Set} setA
 * @param {Set} setB
 * @returns Set
 */
function union(setA, setB) {
  let set = new Set(setA);
  for (const item of setB) {
    set.add(item);
  }
  return set;
}

/**
 * @description 求交集
 * @param {Set} setA
 * @param {Set} setB
 * @returns Set
 */
function intersection(setA, setB) {
  let set = new Set();
  for (const item of setA) {
    if (setB.has(item)) {
      set.add(item);
    }
  }
  return set;
}

/**
 * @description 求差集，集合A相对于集合B的差集
 * @param {Set} setA
 * @param {Set} setB
 * @returns Set
 */
function difference(setA, setB) {
  let set = new Set(setA);
  for (const item of setA) {
    if (setB.has(item)) {
      set.delete(item);
    }
  }
  return set;
}

/**
 * @description 求对称差集
 * @param {Set} setA
 * @param {Set} setB
 * @returns set
 */
function symmetricDifference(setA, setB) {
  let set = new Set(setA);
  for (const item of setB) {
    if (setA.has(item)) {
      set.delete(item);
    } else {
      set.add(item);
    }
  }
  return set;
}

/**
 * @description 判断一个集合是否为另一个集合的超集
 * @param {Set} superset
 * @param {Set} subset
 * @returns
 */
function isSuperset(superset, subset) {
  for (const item of subset) {
    if (!superset.has(item)) {
      return false;
    }
  }
  return true;
}

// test
let setA = new Set([1, 2, 3, 4]);
let setB = new Set([1, 4, 9, 0]);
let setC = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
console.log(union(setA, setB));
console.log(union(setB, setC));
console.log(intersection(setB, setC));
console.log(intersection(setB, setA));
console.log(difference(setA, setB));
console.log(difference(setB, setC));
console.log(symmetricDifference(setB, setC));
console.log(symmetricDifference(setA, setB));
console.log(isSuperset(setB, setC));
console.log(isSuperset(setC, setA));
