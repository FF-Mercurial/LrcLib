import map from './map'

const TOKEN_RE = getTokenRegex(map)
const COLOR_RE = /^(\S+)\s*:\s*/
const SPLIT_RE = /(^|\s+)(?=\S+\s*:\s*)/

export default (lrc, colors) => {
  let translatedLrc = []

  lrc && lrc.split('\n').forEach((line) => {
    translatedLrc.push(line.split(SPLIT_RE).map((piece) => {
      // extract color
      let colorRes = extractColor(piece)
      let color = colorRes.color
      piece = colorRes.text

      let tokens = []
      let tsuFlag = false
      let ptr = 0
      let m, srcChar, dstChar, nextSrcChar, romaji

      while (1) {
        TOKEN_RE.lastIndex = ptr
        m = TOKEN_RE.exec(piece)

        if (!m) break

        srcChar = m[0]

        if (srcChar === 'っ' || srcChar === 'ッ') {
          TOKEN_RE.lastIndex = ptr + srcChar.length
          m = TOKEN_RE.exec(piece)

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

      return {
        color: color,
        tokens: tokens
      }
    }))

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
        return {
          color: 'black',
          text: text
        }
      }
    }
  })

  return translatedLrc
}


function tsu(romaji) {
  return romaji[0] + romaji
}

function getTokenRegex(map) {
  let regexStr = Object.getOwnPropertyNames(map).sort((a, b) => -(a.length - b.length)).join('|') + '|.'

  return new RegExp(regexStr, 'g')
}