const PerformanceMeasure = require('../')
const m = new PerformanceMeasure()

const fastify = require('fastify')({
  logger: false
})

fastify.addHook('preHandler', function (request, reply, next) {
  m.start(request.raw.id)
  next()
})

fastify.addHook('onSend', function (request, reply, _, next) {
  const routeId = reply.context.config.statsId ? reply.context.config.statsId : request.raw.url
  m.endAs(request.raw.id, routeId)
  next()
})

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

fastify.get('/__stats__', async (req, reply) => {
  const style = "font-family: 'Fira Mono', 'Andale Mono', 'Consolas', 'monospace';"
  reply
    .header('Content-Type', 'Content-type: text/html; charset=utf-8')
    .send(`<pre style="${style}">${m.print()}</pre>`)
})

fastify.get('/', (request, reply) => {
  sleep(100)
  reply.send({ GET: '/' })
})

fastify.get('/items', (request, reply) => {
  sleep(100)
  reply.send({ GET: 'items/' })
})

fastify.get('/items/:id', { config: { statsId: '/items/:id' } }, (request, reply) => {
  sleep(100)
  const id = request.params.id
  reply.send({ GET: `/items/${id}` })
})

fastify.listen(4000, (err, address) => {
  if (err) throw err
  console.log(`server listening on ${address}`)
})
