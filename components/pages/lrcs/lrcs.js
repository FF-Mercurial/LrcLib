import localSearch from 'widgets/local-search'
import * as _ from 'util'
import * as jp from 'jp'
import * as service from 'service'
import popError from 'widgets/pop-error'
import confirm from 'ui/confirm'

export default Vue.extend({
  template: __inline('./lrcs.tpl'),
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

          if (_.has(lrc.searchTags, (tag) => {

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

      this.lrcs = data.lrcs
      this.lrcs.forEach((lrc) => {
        lrc.searchTags = lrc.searchTags || []
      })
      this.lrcs.forEach(addKanaTag)
    })

    function addKanaTag(lrc) {
      let foo = [lrc.title]
      _.pushArray(foo, lrc.tags)
      foo.forEach((item) => {
        lrc.searchTags.push(jp.toKana(item))
      })
    }
  }
})