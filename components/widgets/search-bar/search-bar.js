import * as service from 'service'
import autoFocus from 'directives/auto-focus'

export default Vue.extend({
  template: __inline('./search-bar.tpl'),
  props: ['on-lrc', 'on-clear-lrcs'],
  data: function () {
    return {
      wd: '',
      searching: false,
      progress: 0,
    }
  },
  computed: {
    p: function () {
      return this.progress * 100
    },
  },
  directives: {
    'auto-focus': autoFocus
  },
  methods: {
    onSearch: function () {
      this.onClearLrcs()
      this.searching = true

      service.search(
        this.wd,
        (progress) => {
          this.progress = progress
          this.$$.progress.style.width = this.p + '%'
        },
        (lrc) => this.onLrc(lrc),
        () => this.searching = false,
      )
    },
  },
})