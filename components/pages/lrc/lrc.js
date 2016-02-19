import * as service from 'service'
import popErrror from 'widgets/pop-error'
import lrcEditor from 'widgets/lrc-editor'
import tagsInput from 'ui/tags-input'
import confirm from 'ui/confirm'
import config from 'config'

export default Vue.extend({
  template: __inline('./lrc.tpl'),
  props: ['params'],
  data: function () {
    return {
      lrc: {
        title: '',
        tags: [],
        searchTags: [],
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
  computed: {
    dirty: {
      get: function () {
        return this.$.lrcEditor.dirty
      },
      set: function (val) {
        this.$.lrcEditor.dirty = val
      }
    },
    _id: function () {
      return this.params._id
    }
  },
  ready: function () {
    service.getLrc(this._id, (err, data) => {
      if (err) return popError(err)

      if (!data.lrc) return page('/p/lrcs')

      if (!data.lrc.tags) data.lrc.tags = []
      if (!data.lrc.searchTags) data.lrc.searchTags = []
      this.lrc = data.lrc
    })
  },
  methods: {
    onSubmit: function () {
      service.patchLrc(this._id, {
        title: this.lrc.title,
        tags: this.lrc.tags,
        searchTags: this.lrc.searchTags,
        content: this.lrc.content,
      }, (err) => {
        if (err) return popError(err)
        this.dirty = false

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

            page('/p/lrcs')
          })
        }
      })
    },
    onSetNow: function () {
      service.setNow(this.lrc, (err) => {
        if (err) return popError(err)

        page('/now')
      })
    },
    confirmBeforeLeave: function (cb) {
      if (this.$.lrcEditor.dirty) {
        confirm({
          title: '离开页面',
          content: '有歌词正在编辑, 确定要离开此页?'
        }, cb)
      } else {
        cb(true)
      }
    },
  },
})