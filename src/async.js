/**
 * Async/Await demo
 * @date 2018-06-10
 * @author Markey
 */
async function testAsync() {
  const res1 = await new Promise((res) => {
    setTimeout(() => {
      res('step-1')
    }, 2000)
  })
  console.log(res1)
  const res2 = await Promise.resolve('step-2')
  console.log(res2)
  const res3 = await new Promise((res) => {
    setTimeout(() => {
      res('step-3')
    }, 2000)
  })
  console.log(res3)
  return [res1, res2, res3, 'end']
}

testAsync().then((data) => {
  console.log(data)
})
