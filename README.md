# performance-measure

[![Build Status](https://travis-ci.org/okamuuu/performance-measure.svg?branch=master)](https://travis-ci.org/okamuuu/performance-measure)

measure specilizing in speed up contests.

## Install

```sh
npm install performance-measure
```

## Example

codes:

```js
const PerformanceMeasure = require('performance-measure')

async function main() {
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

main ()

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}
```

result:

```
name    size  sum     max     min     mean  
------  ----  ------  ------  ------  ------
foobar     1  404.43  404.43  404.43  404.43
A          2  308.94  204.18  104.76  154.47
B          1  100.44  100.44  100.44  100.44
```

SEE ALSO: `examples/*.js`

## License

MIT
