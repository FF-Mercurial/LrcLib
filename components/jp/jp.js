import _map from './map'

export let map = _map

const REPLACE_REGEX = getReplaceRegex()

export function toKana(str) {
  return str.replace(REPLACE_REGEX, (m) => {
    if (m in map) return map[m]
    return m
  })
}

function getReplaceRegex() {
  let regexStr = Object.getOwnPropertyNames(map).sort((a, b) => -(a.length - b.length)).join('|') + '|.'

  return new RegExp(regexStr, 'g')
}