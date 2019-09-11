# performance-measure

[![Build Status](https://travis-ci.org/okamuuu/performance-measure.svg?branch=master)](https://travis-ci.org/okamuuu/performance-measure)

measure specilizing in speed up contests.

## Install

```
npm install performance-measure
```

## Example

codes:

```
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
  m.end('C')

  console.log(m.print())
}

main ()

function sleep(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}
```

result:

```
name  size  sum     max     min     mean  
----  ----  ------  ------  ------  ------
C        1  405.09  405.09  405.09  405.09
A        2  310.80  204.91  105.89  155.40
B        1  104.28  104.28  104.28  104.28
```

SEE ALSO: `examples/*.js`

## License

MIT
