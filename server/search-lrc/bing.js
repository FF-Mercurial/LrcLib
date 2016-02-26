import request from 'request'
import config from '../../config'

const accountKey = config.bingAccountKey

export default function (keyword, limit, cb) {
  let url = qs('https://api.datamarket.azure.com/Bing/Search/v1/Web', {
    $format: 'json',
    Query: "'" + keyword + "'",
    $top: limit
  })
  let auth = new Buffer(accountKey + ':' + accountKey).toString('base64')

  request({
    method: 'GET',
    url: url,
    json: true,
    headers: {
      Authorization: 'Basic ' + auth
    }
  }, (err, res, body) => {
    if (err) return cb(err)

    if (typeof body === 'string') return cb(body)

    cb(null, body.d.results.map((item) => item.Url))
  })

  function qs(url, qs) {
    let res = url
    let pairs = []

    for (let key in qs) pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(qs[key]))

    if (pairs.length > 0) res += '?' + pairs.join('&')

    return res
  }
}