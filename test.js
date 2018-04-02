const test = {
  a: 'a',
  b: {
    c: 'c',
    d: {
      f: 'f'
    }
  }
}

const test1 = {
  e: 'e',
  ...test.b
}

console.log(test1)