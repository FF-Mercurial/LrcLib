export default Vue.extend({
  template: __inline('./header.tpl'),
  props: ['cur-page'],
  data: function () {
    return {
      pages: [
        {
          id: 'lrcs',
          text: '歌词库',
          alias: ['lrc']
        },
        {
          id: 'home',
          text: '制作'
        },
        {
          id: 'now',
          text: '当前歌曲'
        }
      ]
    }
  },
})