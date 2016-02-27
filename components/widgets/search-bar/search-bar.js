import * as service from 'service'
import config from 'config'
import autoFocus from 'directives/auto-focus'
import radio from 'ui/radio'

export default Vue.extend({
  template: __inline('./search-bar.tpl'),
  props: ['on-lrc', 'on-clear-lrcs'],
  data: function () {
    return {
      keyword: '',
      searching: false,
      progress: 0,
      searchEngine: 'baidu',
      searchEngines: config.searchEngines
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
  components: {
    radio: radio
  },
  methods: {
    onSearch: function () {
      this.onClearLrcs()
      this.searching = true

      service.search({
        keyword: this.keyword,
        searchEngine: this.searchEngine,
        onProgress: (progress) => {
          this.progress = progress
          this.$$.progress.style.width = this.p + '%'
        },
        onLrc: (lrc) => this.onLrc(lrc),
        onEnd: () => this.searching = false
      })
    },
  },
})