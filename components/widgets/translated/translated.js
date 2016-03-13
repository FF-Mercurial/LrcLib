import translate from './translate'
import printTranslated from './printTranslated'

export default Vue.extend({
  template: __inline('./translated.tpl'),
  props: ['content', 'colors'],
  watch: {
    content: function (content) {
      printTranslated(this.$$.container, this.$$.canvas, translate(content, this.colors))
    },
  },
  ready: function () {
    printTranslated(this.$$.container, this.$$.canvas, [])
  },
  methods: {
    getDataURL: function () {
      return this.$$.canvas.toDataURL()
    }
  }
})