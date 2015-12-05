import jp from './jp'
import _ from './util'

const REGEX_KANJI = new RegExp(jp.KANJI, 'g')
const REGEX_KANA = new RegExp(jp.KANA, 'g')
const REGEX_COMMENT = new RegExp(`${jp.KANJI}(\\(${jp.KANA}+\\)|（${jp.KANA}+）)`, 'g')
const MIN_LENGTH = 10
const MIN_KANA_RATIO = 0.1
const MIN_COMMENT_RATIO = 0.1

function eachSection(textNodes, cb) {
  let i = 0

  while (i < textNodes.length) {
    let section = []
    let j

    for (j = i; j < textNodes.length; j++) {
      if (textNodes[j].depth !== textNodes[i].depth) break
      section.push(textNodes[j].text)
    }

    i = j + 1
    cb(section)
  }
}

function noKanji(section) {
  return !_.has(section, (line) => REGEX_KANJI.test(line))
}

function haveKana(section) {
  return _.has(section, (line) => REGEX_KANA.test(line))
}

function haveEnoughKana(section) {
  let total = 0.01
  let kanaCount = 0

  _.each(section, (line) => {
    _.each(line, (word) => {
      total++
      if (REGEX_KANA.test(word)) kanaCount++
    })
  })

  return kanaCount / total > MIN_KANA_RATIO
}

function haveComments(section) {
  if (noKanji(section)) {
    return true
  } else {
    return _.has(section, (line) => REGEX_COMMENT.test(line))
  }
}

function haveEnoughComments(section) {
  let total = 0.01
  let commentCount = 0

  _.each(section, (line) => {
    REGEX_COMMENT.lastIndex = 0
    while (REGEX_COMMENT.exec(line)) commentCount++
    REGEX_KANJI.lastIndex = 0
    while (REGEX_KANJI.exec(line)) total++
  })

  return commentCount / total > MIN_COMMENT_RATIO
}

function longEnough(section) {
  return section.length >= MIN_LENGTH
}

function assertAll(conditions, section) {
  return _.all(conditions, (condition) => condition(section))
}

export default function (textNodes) {
  let lrcs = []
  let conditions = [haveEnoughKana, haveEnoughComments, longEnough]

  eachSection(textNodes, function (section) {
    if (assertAll(conditions, section)) lrcs.push(section)
  })

  return lrcs
}