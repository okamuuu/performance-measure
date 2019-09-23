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

test('endAs', async (t) => {
  const m = new PerformanceMeasure()
  m.start('foo')
  await sleep(10)
  m.endAs('foo', 'bar')

  t.ok(m.stats()[0].name === 'bar')
})

test('multi instances', async (t) => {
  const m1 = new PerformanceMeasure()
  const m2 = new PerformanceMeasure()

  m1.start('bar')
  await sleep(10)
  m1.end('bar')

  m2.start('bar')
  await sleep(10)
  m2.end('bar')

  t.ok(m1.stats()[0].size === 1)
  t.ok(m2.stats()[0].size === 1)
})
