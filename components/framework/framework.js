import header from 'widgets/header'
import home from 'pages/home'
import lrcs from 'pages/lrcs'
import lrc from 'pages/lrc'
import now from 'pages/now'
import page404 from 'pages/404'
import confirm from 'ui/confirm'

let components = {
  'header': header,
  '404': page404,
}

let pageComponents = {
  'page-home': home,
  'page-lrcs': lrcs,
  'page-lrc': lrc,
  'page-now': now,
}

for (let key in pageComponents) components[key] = pageComponents[key]
  
let opts = {
  template: __inline('./framework.tpl'),
  replace: false,
  data: function () {
    return {
      curPage: '',
      query: {},
      params: {},
      pages: ['home', 'lrcs', 'lrc', 'now']
    }
  },
  components: components,
  ready: function () {
    window.onbeforeunload = () => {
      let page = this.$.page
      if (page && page.confirmBeforeLeave) return page.confirmBeforeLeave()
    }
    
    // routes
    page.base('/p')
    page.exit('*', (ctx, next) => {
      let page = this.$.page
      if (page && page.confirmBeforeLeave) {
        let msg = page.confirmBeforeLeave()
        if (msg) {
          confirm({
            title: '离开页面',
            content: msg
          }, (yes) => {
            if (yes) next()
          })
        } else {
          next()
        }
      } else {
        next()
      }
    })
    page('*', (ctx, next) => {
      // update query
      let query = {}

      ctx.querystring.split('&').forEach((kv) => {
        let _kv = kv.split('=')
        let key = _kv[0]
        let value = _kv[1]
        query[key] = value
      })

      this.query = query
      next()
    })
    page('/lrc/:_id', (ctx) => {
      this.curPage = 'lrc'
      this.params = ctx.params
    })
    page('/:pageId', (ctx) => {
      // update curPage
      let m = ctx.pathname.match(/\/p\/([^\/]+)$/)
      this.curPage = m && m[1]
    })
    page('*', '/home')
    page()
  },
  methods: {
    pageExists: function (page) {
      return pageComponents['page-' + page]
    }
  }
}

export default function (el) {
  opts.el = el
  new Vue(opts)
}