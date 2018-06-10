/**
 * Generator demo
 * @date 2018-06-10
 * @author Markey
 */
// 1. 基本用法
function* test() {
  const res1 = yield Promise.resolve('step-1')
  const res2 = yield new Promise((res) => {
    setTimeout(() => {
      res('step-2')
    }, 2000)
  })
  // yield表达式本身没有返回值
  console.log(res1)
  const res3 = yield 'step-3'
  const res4 = yield 'step-4'
  return 'end'
}
const itor = test()
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())
console.log(itor.next())

// 2. 使用co模块
/*const co = require('co')

co(function* () {
  const res1 = yield ['step-1']
  console.log(res1)
  // 原生generator的yield并不会等待异步操作，只要你调用了next方法，就会继续往下执行，但使用了co模块后，会等待异步操作返回后再继续
  const res2 = yield new Promise((res) => {
    setTimeout(() => {
      res('step-2')
    }, 2500)
  })
  console.log(res2)
  return 'end'
}).then((data) => {
  console.log('end: ' + data)
})*/

// 3. 自制co模块
// 核心思想：
// 1. 利用一个大Promise包装Generator中所有异步结果
// 2. 使用多个Promise将每个yield表达式的返回值串联起来
// 3. 利用Iterator.next方法能够修改上一个yield表达式返回值的特性，使每个yield的异步操作结束后都能获得返回结果
/*function myCo(gen) {
  const itor = gen()

  return new Promise((resolve, reject) => {
    function next(res) {
      const ret = itor.next(res)
      if (ret.done) {
        resolve(ret.value)
      }
      else {
        ret.value.then((data) => next(data))
                 .catch((err) => reject(err))
      }
    }
    next()
  })
}

myCo(function* () {
  const res1 = yield Promise.resolve('res1')
  console.log(res1)
  const res2 = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('res2')
      resolve('res2')
    }, 2000)
  })
  console.log(res2)
  const res3 = yield new Promise((resolve) => {
    setTimeout(() => {
      resolve('res3')
    }, 2000)
  })
  console.log(res3)
  return 'end'
}).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log('捕获到错误')
  console.log(err)
})*/

// 4. 其他用途：部署Iterator接口
/*function* iterEntries() {
  const keys = Reflect.ownKeys(this)
  // 这样会报错，原因不明
  // keys.forEach((key) => {
  //   yield [key, this[key]]
  // })
  for (let i = 0; i < keys.length; i++) {
    yield {
      key: keys[i],
      value: this[keys[i]]
    }
  }
}
const myObj = { foo: 3, bar: 7 }
myObj[Symbol.iterator] = iterEntries

console.log(...myObj)
for (let { key, value } of myObj) {
  console.log(key, value)
}*/







