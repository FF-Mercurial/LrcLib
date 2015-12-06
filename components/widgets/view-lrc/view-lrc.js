import * as service from 'service'
import popErrror from 'widgets/pop-error'
import lrcEditor from 'widgets/lrc-editor'
import tagsInput from 'ui/tags-input'
import confirm from 'ui/confirm'
import config from 'config'

export default Vue.extend({
  template: __inline('./view-lrc.tpl'),
  props: ['_id'],
  data: function () {
    return {
      lrc: {
        title: '',
        tags: [],
        isImg: false,
        content: '',
      }
    }
  },
  components: {
    lrcEditor: lrcEditor,
    tagsInput: tagsInput,
  },
  filters: {
    url: function (path) {
      return config.staticHost + path
    }
  },
  ready: function () {
    if (this._id) {
      service.getLrc(this._id, (err, data) => {
        if (err) return popError(err)
  
        if (!data.lrc) return page('/p/lib')
  
        this.lrc = data.lrc
      })
    } else {
      service.getNow((err, data) => {
        if (err) return popError(err)

        this.lrc = data.now
      })
    }
  },
  methods: {
    onSubmit: function () {
      service.patchLrc(this._id, {
        title: this.lrc.title,
        tags: this.lrc.tags,
        content: this.lrc.content,
      }, (err) => {
        if (err) return popError(err)

        $(this.$$.hint)
          .css({
            display: 'inline',
            opacity: 1,
          })
          .delay(1000)
          .animate({
            opacity: 0
          }, 1000, 'linear', () => $(this).css('display', 'none'))
      })
    },
    onRemove: function () {
      confirm({
        title: '删除歌词',
        content: '确定要删除 `' + this.lrc.title + '` 吗?',
        color: 'danger',
      }, (yes) => {
        if (yes) {
          service.removeLrc(this._id, (err) => {
            if (err) return popError(err)

            page('/p/lib')
          })
        }
      })
    },
    onSetNow: function () {
      service.setNow(this.lrc, (err) => {
        if (err) return popError(err)

        page('/now')
      })
    }
  },
})