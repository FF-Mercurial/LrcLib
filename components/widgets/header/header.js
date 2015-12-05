export default Vue.extend({
  template: __inline('./header.tpl'),
  props: ['cur-page'],
  data: function () {
    return {
      pages: [
        {
          id: 'lib',
          text: '歌词库'
        },
        {
          id: 'home',
          text: '制作'
        },
      ]
    }
  },
})