import * as service from 'service'
import searchBar from 'widgets/search-bar'
import pagination from 'widgets/pagination'
import lrcEditor from 'widgets/lrc-editor'
import popError from 'widgets/pop-error'
import confirm from 'ui/confirm'

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
    confirmBeforeLeave: function (cb) {
      if (this.$.lrcEditor.dirty) return '有歌词正在编辑, 确定要离开此页?'
    },
    onClearLrcs: function () {
      this.cur = 0
      this.lrcs = ['']
      this.lrcs.length = 0
      this.$.lrcEditor.dirty = false
    },
    onLrc: function (lrc) {
      if (this.lrcs[0] === '') this.lrcs.$set(0, lrc)
      else this.lrcs.push(lrc)
    }
  },
})