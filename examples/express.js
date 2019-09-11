const express = require('express')
const PerformanceMeasure = require('../')

const app = express()
const m = new PerformanceMeasure()

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// copied from fastify
const maxInt = 2147483647
let nextReqId = 0
function genReqId () {
  return (nextReqId = (nextReqId + 1) & maxInt)
}

app.use((req, res, next) => {
  res.locals.reqId = genReqId()
  m.start(res.locals.reqId)
  next()
})

app.get('/', async (req, res, next) => {
  await sleep(10)
  res.send('GET /')
  next()
})

app.get('/items', async (req, res, next) => {
  await sleep(10)
  res.send('GET /items')
  next()
})

app.get('/items/:id', async (req, res, next) => {
  await sleep(10)
  res.send('GET /items/:id')
  next()
})

app.get('/__stats__', (req, res, next) => {
  const style = "font-family: 'Fira Mono', 'Andale Mono', 'Consolas', 'monospace';"
  res.send(`<pre style="${style}">${m.print()}</pre>`)
  next()
})

app.use((req, res, next) => {
  const path = req.route ? req.route.path : req.path
  m.endAs(res.locals.reqId, req.method + ' ' + path)
  // m.endAs(res.locals.reqId, req.method + ' ' + res.statusCode + '' +  path)
  next()
})

app.listen(3000, () => console.log('Listening on port 3000'))
