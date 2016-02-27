export default (opts, cb) => {
  const searchUrl = require('./search-engines/' + opts.searchEngine)

  searchUrl(opts.keyword, opts.limit, cb)
}