import map from './map'

const TOKEN_RE = getTokenRegex(map)
const COLOR_RE = /^\s*(\S+)\s*:\s*/

export default (lrc, colors) => {
  let translatedLrc = []

  lrc && lrc.split('\n').forEach((line) => {
    // extract color
    let colorRes = extractColor(line)
    let color = colorRes.color
    line = colorRes.text

    let tokens = []
    let tsuFlag = false
    let ptr = 0
    let m, srcChar, dstChar, nextSrcChar, romaji

    while (1) {
      TOKEN_RE.lastIndex = ptr
      m = TOKEN_RE.exec(line)

      if (!m) break

      srcChar = m[0]

      if (srcChar === 'っ' || srcChar === 'ッ') {
        TOKEN_RE.lastIndex = ptr + srcChar.length
        m = TOKEN_RE.exec(line)

        if (!m) {
          dstChar = ''
        } else {
          nextSrcChar = m[0]
          romaji = map[nextSrcChar]

          if (!romaji) {
            tsuFlag = true
            dstChar = ''
          } else {
            dstChar = tsu(romaji)
            srcChar += nextSrcChar
          }
        }
      } else {
        romaji = map[srcChar]

        if (!romaji) {
          dstChar = ''
        } else {
          dstChar = romaji

          if (tsuFlag) {
            dstChar = tsu(dstChar)
            tsuFlag = false
          }
        }
      }

      ptr += srcChar.length

      if (srcChar[0] === '#') srcChar = srcChar.substr(1)

      tokens.push({
        src: srcChar,
        dst: dstChar,
      })
    }

    translatedLrc.push({
      color: color,
      tokens: tokens
    })
  })

  return translatedLrc

  function extractColor(text) {
    let m = text.match(COLOR_RE)
    let colorId = m && m[1]
    let color = colorId && colors[colorId]

    if (color) {
      return {
        color: color,
        text: text.replace(COLOR_RE, '')
      }
    } else {
      return { text: text }
    }
  }
}


function tsu(romaji) {
  return romaji[0] + romaji
}

function getTokenRegex(map) {
  let regexStr = Object.getOwnPropertyNames(map).sort((a, b) => -(a.length - b.length)).join('|') + '|.'

  return new RegExp(regexStr, 'g')
}