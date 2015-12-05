import * as service from 'service'
import * as _ from 'util'
import lrcList from 'widgets/lrc-list'
import viewLrc from 'widgets/view-lrc'
import popError from 'widgets/pop-error'

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
    },
  },
})