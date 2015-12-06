import viewLrc from 'widgets/view-lrc'
import popError from 'widgets/pop-error'

export default Vue.extend({
  template: __inline('./now.tpl'),
  components: {
    viewLrc: viewLrc
  }
})