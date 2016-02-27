import async from 'async'
import fetch from './fetch'
import searchUrls from './search-urls'
import extractTextNodes from './extract-text-nodes'
import extractLrc from './extract-lrc'

const CONCURRENCY = 5

export default ({ keyword, limit, searchEngine, onProgress, onLrc, onEnd }) => {
  searchUrls({
    keyword: keyword,
    limit: limit,
    searchEngine: searchEngine
  }, (err, urls) => {
    if (err) {
      console.log(err)
      return onEnd && onEnd()
    }

    let count = 0
    let total = urls.length

    async.parallelLimit(urls.map((url) => {
      return (cb) => {
        fetch(url, (err, body) => {
          if (err) {
            onProgress && onProgress((++count) / total)
            return cb()
          }

          let textNodes = extractTextNodes(body)
          let _lrcs = extractLrc(textNodes)

          _lrcs.forEach((_lrc) => onLrc(_lrc))
          onProgress && onProgress((++count) / total)
          cb()
        })
      }
    }), CONCURRENCY, onEnd)
  })
}