import autoFocus from 'directives/auto-focus'

export default Vue.extend({
  template: __inline('./local-search.tpl'),
  data: function () {
    return {
      wd: '',
    }
  },
  directives: {
    'auto-focus': autoFocus
  }
})