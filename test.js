const { test } = require('tap')

const PerformanceMeasure = require('./')

function sleep (ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

test('produces some stats', async (t) => {
  const m = new PerformanceMeasure()
  m.start('foo')
  await sleep(10)
  m.end('foo')

  m.start('foo')
  await sleep(10)
  m.end('foo')

  const stats = m.stats()

  t.ok(stats[0].name === 'foo')
  t.ok(stats[0].size === 2)
})
