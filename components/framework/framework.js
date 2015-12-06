import header from 'widgets/header'
import home from 'pages/home'
import lib from 'pages/lib'
import now from 'pages/now'

let opts = {
  template: __inline('./framework.tpl'),
  replace: false,
  data: function () {
    return {
      curPage: '',
      qs: {},
    }
  },
  components: {
    'header': header,
    'page-home': home,
    'page-lib': lib,
    'page-now': now,
  },
  ready: function () {
    // routes
    page.base('/p')
    page('/:pageId', (ctx) => {
      // update curPage
      let m = ctx.pathname.match(/\/p\/([^\/]+)$/)
      this.curPage = m && m[1]

      // update qs
      let qs = {}

      ctx.querystring.split('&').forEach((kv) => {
        let _kv = kv.split('=')
        let key = _kv[0]
        let value = _kv[1]
        qs[key] = value
      })

      this.qs = qs
    })
    page('*', '/home')
    page()
  },
}

export default function (el) {
  opts.el = el
  new Vue(opts)
}