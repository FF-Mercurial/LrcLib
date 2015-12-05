import translate from './translate'
import printTranslated from './printTranslated'

export default Vue.extend({
  template: __inline('./translated.tpl'),
  props: ['content'],
  watch: {
    content: function (content) {
      printTranslated(this.$$.container, this.$$.canvas, translate(content), '#333')
    },
  },
  ready: function () {
    printTranslated(this.$$.container, this.$$.canvas, [], '#333')
  },
})