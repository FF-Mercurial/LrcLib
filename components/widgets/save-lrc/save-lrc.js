import pop from 'ui/pop'
import alert from 'ui/inline-alert'
import * as service from 'service'
import tagsInput from 'ui/tags-input'
import popAlert from 'ui/pop-alert'

let opts = {
  template: __inline('./save-lrc.tpl'),
  data: {
    title: '',
    tags: [],
    searchTags: [],
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

      service.saveLrc(this.title, this.tags, this.searchTags, this.content, (err, data) => {
        if (err) return popError(err)
        this.closePop()
        this.onSubmit && this.onSubmit(data._id)
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