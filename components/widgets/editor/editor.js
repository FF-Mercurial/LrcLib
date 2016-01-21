export default Vue.extend({
  template: __inline('./editor.tpl'),
  props: ['content'],
  data: function () {
    return {
      dirty: false
    }
  },
  methods: {
    onTouch: function () {
      this.dirty = true
    }
  }
})