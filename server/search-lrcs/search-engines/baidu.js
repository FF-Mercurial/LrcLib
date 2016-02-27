import request from 'request'

export default (keyword, limit, cb) => {
  request({
    url: 'http://baidu.com/s',
    qs: {
      tn: 'json',
      rn: limit,
      wd: keyword,
    },
    json: true,
  }, (err, res, body) => {
    if (err) {
      cb(err)
    } else {
      let entry = body && body.feed && body.feed.entry
      let urls = entry ? entry.map((item) => item.url).slice(0, -2) : []
      cb(null, urls)
    }
  })
}