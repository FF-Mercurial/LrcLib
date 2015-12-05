import * as service from 'service'
import searchBar from 'widgets/search-bar'
import pagination from 'widgets/pagination'
import lrcEditor from 'widgets/lrc-editor'
import popError from 'widgets/pop-error'

export default Vue.extend({
  template: __inline('./home.tpl'),
  props: ['_id'],
  data: function () {
    return {
      lrcs: [''],
      cur: 0,
    }
  },
  computed: {
    total: function () {
      return this.lrcs.length
    }
  },
  components: {
    searchBar: searchBar,
    pagination: pagination,
    lrcEditor: lrcEditor,
  },
  methods: {
    onClearLrcs: function () {
      this.cur = 0
      this.lrcs = ['']
      this.lrcs.length = 0
    },
    onLrc: function (lrc) {
      if (this.lrcs[0]) this.lrcs.pop()
      this.lrcs.push(lrc)
    }
  },
})