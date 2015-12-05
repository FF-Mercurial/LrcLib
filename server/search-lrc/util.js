export function each(objOrArr, cb) {
  let ret

  if (objOrArr instanceof Array) {
    let arr = objOrArr
    for (let i = 0; i < arr.length; i++) {
      cb(arr[i], i, (_ret) => {
        i = arr.length
        ret = _ret
      })
    }
  } else {
    let obj = objOrArr
    let breaked = false
    for (let key in obj) {
      cb(obj[key], key, () => breaked = true)
      if (breaked) break
    }
  }

  return ret
}

export function has(objOrArr, cb) {
  return each(objOrArr, (value, key, bk) => {
    if (cb(value)) bk(true)
  }) || false
}

export function all(objOrArr, cb) {
  return !has(objOrArr, (value) => !cb(value))
}

export function trim(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '')
}

export default module.exports