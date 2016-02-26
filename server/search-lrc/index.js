import async from 'async'
import baidu from './baidu'
import bing from './bing'
import fetch from './fetch'
import extractTextNodes from './extract-text-nodes'
import extractLrc from './extract-lrc'

const CONCURRENCY = 5

export default (keyword, limit, onProgress, onLrc, onEnd) => {
  bing(keyword, limit, (err, urls) => {
    if (err) {
      console.log(err)
      return onEnd()
    }

    let count = 0
    let total = urls.length

    async.parallelLimit(urls.map((url) => {
      return (cb) => {
        fetch(url, (err, body) => {
          if (err) {
            onProgress((++count) / total)
            return cb()
          }

          let textNodes = extractTextNodes(body)
          let _lrcs = extractLrc(textNodes)

          _lrcs.forEach((_lrc) => onLrc(_lrc))
          onProgress((++count) / total)
          cb()
        })
      }
    }), CONCURRENCY, onEnd)
  })
}