import * as service from 'service'
import popError from 'widgets/pop-error'
import lrcEditor from 'widgets/lrc-editor'
import config from 'config'

export default Vue.extend({
  template: __inline('./now.tpl'),
  props: ['_id'],
  data: function () {
    return {
      lrc: {
        content: '',
      }
    }
  },
  components: {
    lrcEditor: lrcEditor
  },
  ready: function () {
    service.getNow((err, data) => {
      if (err) return popError(err)

      this.lrc = data.now
    })
  }
})