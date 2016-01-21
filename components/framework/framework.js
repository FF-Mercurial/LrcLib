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
      var that = this
      
      if (this.curPage) {
        var page = this.$['page-' + this.curPage]
        if (page && page.confirmBeforeLeave) {
          if (typeof page.confirmBeforeLeave === 'function') {
            page.confirmBeforeLeave((yes) => yes && foo())
          } else {
            confirm('确定要离开此页吗?') && foo()
          }
        } else {
          foo()
        }
      } else {
        foo()
      }

      function foo() {
        // update curPage
        let m = ctx.pathname.match(/\/p\/([^\/]+)$/)
        that.curPage = m && m[1]

        // update qs
        let qs = {}

        ctx.querystring.split('&').forEach((kv) => {
          let _kv = kv.split('=')
          let key = _kv[0]
          let value = _kv[1]
          qs[key] = value
        })

        that.qs = qs
      }
    })
    page('*', '/home')
    page()
  },
}

export default function (el) {
  opts.el = el
  new Vue(opts)
}