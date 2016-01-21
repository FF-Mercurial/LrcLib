import * as service from 'service'
import * as _ from 'util'
import lrcList from 'widgets/lrc-list'
import viewLrc from 'widgets/view-lrc'
import popError from 'widgets/pop-error'
import confirm from 'ui/confirm'

export default Vue.extend({
  template: __inline('./lib.tpl'),
  props: ['qs'],
  components: {
    lrcList: lrcList,
    viewLrc: viewLrc
  },
  computed: {
    atLrc: function () {
      return this.qs._id
    }
  },
  watch: {
    atLrc: function (atLrc) {
      this.atLrc = !atLrc
      if (atLrc && this.$.viewLrc && this.$.viewLrc.dirty) {
        confirm({
          title: '离开页面',
          content: '有歌词在编辑, 确定要离开此页?'
        }, (yes) => {
          this.atLrc = atLrc
        })
      }
    }
  },
  methods: {
    confirmBeforeLeave: function (cb) {
      if (this.$.viewLrc && this.$.viewLrc.dirty) {
        confirm({
          title: '离开页面',
          content: '有歌词在编辑, 确定要离开此页?'
        }, cb)
      } else {
        cb(true)
      }
    }
  }
})