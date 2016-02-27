import request from 'request'
import iconv from 'iconv-lite'

const DEFAULT_TIMEOUT = 5000

export default (url, cb) => {
  let options = {
    gzip: true,
    encoding: null,
    timeout: DEFAULT_TIMEOUT,
  }

  request(url, options, (err, res, body) => {
    if (err) console.log(err)
    if (err) return cb(err)

    let utf8decoded = body.toString()
    let m = utf8decoded.match(/<meta .*charset=([^;\'"]+)/)
    let charset = m && m[1]
    let decoded = charset ? iconv.decode(body, charset) : utf8decoded

    cb(null, decoded)
  })
}