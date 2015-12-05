import pop from 'ui/pop'
import alert from 'ui/inline-alert'
import * as service from 'service'
import tagsInput from 'ui/tags-input'
import popAlert from 'ui/pop-alert'

let opts = {
  template: __inline('./save-lrc.tpl'),
  data: {
    title: '',
    tags: '',
  },
  components: {
    tagsInput: tagsInput
  },
  methods: {
    alert: function (msg) {
      alert(this.$$.alert, msg)
    },
    clearAlert: function () {
      $(this.$$.alert).empty()
    },
    _onSubmit: function () {
      if (!this.title) return this.alert('请填写标题')

      service.saveLrc(this.title, this.tags, this.content, (err, data) => {
        this.closePop()

        popAlert({
          title: '保存成功',
          content: '成功保存 `' + this.title + '` 到歌词库',
          color: 'success'
        })
      })
    },
  },
  ready: function () {
    $(this.$$.titleInput).focus()
  }
}

export default function (content, onSubmit) {
  let methods = {}

  if (onSubmit) methods.onSubmit = onSubmit
  
  pop(opts, {
    content: content
  }, methods)
}