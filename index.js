const summary = require('summary')
const Table = require('easy-table')
const { performance, PerformanceObserver } = require('perf_hooks')

// most copied from fastify-routes-stats
class PerformanceMeasure {
  constructor (args = {}) {
    this.instanceId = Math.floor(performance.now() * 100)
    this.measures = []
    this.obs = new PerformanceObserver((items) => {
      items.getEntries().forEach(entry => {
        this.measures.push(entry)
      })
    })
    this.obs.observe({ entryTypes: ['measure'] })
    this.disable = args.disable
  }

  start (name) {
    if (this.disable) {
      return
    }
    performance.mark(`${this.instanceId}:${name}-start`)
  }

  end (name) {
    this.endAs(name, name)
  }

  endAs (name, as) {
    if (this.disable) {
      return
    }
    performance.mark(`${this.instanceId}:${name}-end`)
    performance.measure(
      `${this.instanceId}:${as}`,
      `${this.instanceId}:${name}-start`,
      `${this.instanceId}:${name}-end`)

    performance.clearMarks(`${this.instanceId}:${name}-start`)
    performance.clearMarks(`${this.instanceId}:${name}-end`)
  }

  measurements () {
    return this.measures.reduce((acc, e) => {
      const key = e.name
      if (acc[key]) {
        acc[key].push(e.duration)
      } else {
        acc[key] = [e.duration]
      }
      return acc
    }, {})
  }

  stats () {
    const m = this.measurements()
    return Object.keys(m).map(k => {
      const s = summary(m[k])
      return {
        name: k.replace(this.instanceId + ':', ''),
        size: s.size(),
        sum: s.sum(),
        max: s.max(),
        min: s.min(),
        mean: s.mean()
        // mode: s.mode(),
        // median: s.median(),
        // sd: s.sd()
      }
    })
  }

  print (sort = ['sum|des']) {
    const stats = this.stats()
    var t = new Table()
    stats.forEach(x => {
      t.cell('name', x.name)
      t.cell('size', x.size, Table.number(0))
      t.cell('sum', x.sum, Table.number(2))
      t.cell('max', x.max, Table.number(2))
      t.cell('min', x.min, Table.number(2))
      t.cell('mean', x.mean, Table.number(2))
      // t.cell('mode', x.mode, Table.number(2))
      // t.cell('median', x.median, Table.number(2))
      // t.cell('sd', x.sd, Table.number(2))
      t.newRow()
    })
    t.sort(sort)
    return t.toString()
  }

  reset () {
    this.measures = []
  }
}

module.exports = PerformanceMeasure
