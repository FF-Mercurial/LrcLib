import map from './map'

let regexStr = Object.getOwnPropertyNames(map).sort((a, b) => -(a.length - b.length)).join('|')
let kana, regex

regexStr += '|.'
regex = new RegExp(regexStr, 'g')

export default (lrc) => {
  let translatedLrc = []

  lrc && lrc.split('\n').forEach((line) => {
    let translatedLine = []
    let tsuFlag = false
    let ptr = 0
    let m, srcChar, dstChar, nextSrcChar, romaji

    while (1) {
      regex.lastIndex = ptr
      m = regex.exec(line)

      if (!m) break

      srcChar = m[0]

      if (srcChar === 'っ' || srcChar === 'ッ') {
        regex.lastIndex = ptr + srcChar.length
        m = regex.exec(line)

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

      translatedLine.push({
        src: srcChar,
        dst: dstChar,
      })
    }

    translatedLrc.push(translatedLine)
  })

  return translatedLrc
}


function tsu(romaji) {
  return romaji[0] + romaji
}