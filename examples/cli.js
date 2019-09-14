const PerformanceMeasure = require('../')

async function main () {
  const m = new PerformanceMeasure()
  m.start('A')
  await sleep(100)
  m.end('A')

  m.start('A')
  await sleep(200)
  m.end('A')

  m.start('B')
  await sleep(100)
  m.end('B')

  m.start('C')
  await sleep(400)
  m.endAs('C', 'foobar')

  console.log(m.print())
}

main()

function sleep (ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
