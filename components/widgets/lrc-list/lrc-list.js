import localSearch from 'widgets/local-search'
import * as _ from 'util'
import * as service from 'service'
import popError from 'widgets/pop-error'

export default Vue.extend({
  template: __inline('./lrc-list.tpl'),
  data: function () {
    return {
      lrcs: []
    }
  },
  filters: {
    tag: function (tags) {
      return (tags && tags.join(', ')) || '没有标签'
    },
  },
  components: {
    localSearch: localSearch,
  },
  computed: {
    wd: function () {
      return _.trim(this.$.localSearch.wd)
    },
    displayingLrcs: function () {
      if (this.wd) {
        let regex = new RegExp(this.wd, 'i')

        return this.lrcs.filter((lrc, index) => {
          if (regex.test(lrc.title)) return true

          if (_.has(lrc.tags, (tag) => {
            return regex.test(tag)
          })) return true
  
          return false
        })
      } else {
        return this.lrcs
      }
    }
  },
  ready: function () {
    service.getLrcs((err, data) => {
      if (err) return popError(err)

      this.lrcs = data.lrcs.reverse()
    })
  }
})