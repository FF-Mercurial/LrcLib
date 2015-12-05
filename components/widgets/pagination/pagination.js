export default Vue.extend({
  template: __inline('./pagination.tpl'),
  props: ['total', 'cur'],
  methods: {
    onGoto: function (page) {
      this.cur = page
    },
  },
})