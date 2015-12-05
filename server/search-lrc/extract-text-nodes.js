import cheerio from 'cheerio'
import _ from './util'

const BLANK = '[\\r\\n\\t ]'
const REGEX_ALL_BLANK = new RegExp(`^${BLANK}*$`)
const REGEX_BEGIN_BLANK = new RegExp(`^${BLANK}*`)
const REGEX_END_BLANK = new RegExp(`${BLANK}*$`)

function getTextNodes($, node, depth, resBuf) {
  if (node.type === 'text') {
    resBuf.push({
      text: node.nodeValue,
      depth: depth,
    })
  } else {
    let curNode = node.firstChild

    while (curNode) {
      getTextNodes($, curNode, depth + 1, resBuf)
      curNode = curNode.nextSibling
    }
  }
}

function filterBlank(textNodes) {
  return textNodes.filter((textNode) => !REGEX_ALL_BLANK.test(textNode.text))
}

function trimTextNodes(textNodes) {
  textNodes.forEach((textNode) => textNode.text = _.trim(textNode.text))
}

function splitTextNode(textNode) {
  return textNode.text.split('\n').map((text) => {
    return {
      text: text,
      depth: textNode.depth,
    }
  })
}

function splitTextNodes(textNodes) {
  let res = []

  textNodes.forEach((textNode) => {
    splitTextNode(textNode).forEach((textNode) => res.push(textNode))
  })

  return res
}

export default (html) => {
  let $ = cheerio.load(html)
  let body = $('body')[0]
  let textNodes = []

  if (!body) return []

  getTextNodes($, body, 0, textNodes)
  textNodes = splitTextNodes(textNodes)
  trimTextNodes(textNodes)
  textNodes = filterBlank(textNodes)

  return textNodes
}