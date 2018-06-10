/**
 * Promise demo
 * @date 2018-06-10
 * @author Markey
 */
// 1. 基本用法
/*new Promise((resolve, reject) => {
  setTimeout(function () {
    // resolve('promise resolved !!!')
    reject('promise rejected !!!')
  }, 2000)
}).then((data) => {
  console.log(data)
}).catch((err) => {
  console.log(`catch error: ${err}`)
})*/

// 2. Promise按定义顺序resolve
// 思路：利用ES5的reduce方法，将多个promise串联为在一起并只返回一个
/*function promiseReduce(arr = []) {
  return arr.reduce((pre, cur, index) => {
    return pre.then((data) => {
      console.log(data)
      return cur
    }).catch((err) => {
      console.log(`catched error: ${err}`)
    })
  })
}
// mock多个promise
const promises = []
const msArr = [500, 1000, 1500, 2000]
function simulatePromise(ms, index) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`promise ${index} has resolved, waited ${ms}`)
    }, ms)
  })
}
// 模拟创建5个promise，每个promise的resolve时间随机选择msArr中的任意值
for (const time of msArr) {
  promises.push(
    simulatePromise(
      msArr[Math.floor(Math.random() * msArr.length)],
      msArr.indexOf(time)
    )
  )
}
promiseReduce(promises).then((data) => {
  console.log(data)
})*/

// 3. Promise finally
// 思路：给返回的promise再添加一个then及catch，并返回一个新的promise，方便后面继续链式调用
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  // console.log('********')
  // console.log('调用finally时的promise是否为当前promise：' + (this === p))
  // console.log('********')
  return this.then((value) => {
    // console.log(`finally value: ${value}`)
    return P.resolve(callback(value)).then(() => value)
  }).catch((reason) => {
    return P.resolve(callback(reason)).then(() => { throw reason })
  })
}
new Promise((resolve, reject) => {
  resolve(123)
}).then((data) => {
  console.log(data)
  return data
}).catch((err) => {
  console.log(err)
}).finally((data) => {
  console.log(`finally：${data}`)
}).then((data) => {
  console.log(`finally 之后的 then，data透传过来了：${data}`)
  throw new Error('测试finally能否catch error')
}).finally((data) => {
  console.log(data)
})








