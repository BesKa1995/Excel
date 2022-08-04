import './scss/index.scss'


const test = (number) => {
  const stringifiedNumber = JSON.stringify(number)
  const mathedNumbers = {}
  if (stringifiedNumber.length > 1) {
    console.log('test')
    stringifiedNumber.split('').forEach(x => {
      if ([1, 2, 3, 4].includes(+x)) {
        if (mathedNumbers[x] === undefined) {
          mathedNumbers[x] = 0
        }
        mathedNumbers[x] = mathedNumbers[x] + 1
      }
    })
  }
  return mathedNumbers
}



console.log(test(111))