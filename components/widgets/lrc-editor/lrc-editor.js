import saveLrc from 'widgets/save-lrc'
import editor from 'widgets/editor'
import translated from 'widgets/translated'
import popError from 'widgets/pop-error'
import * as service from 'service'

export default Vue.extend({
  template: __inline('./lrc-editor.tpl'),
  props: ['content', 'no-save'],
  data: function () {
    return {
      tabs: ['原文', '翻译'],
      cur: '原文',
    }
  },
  components: {
    editor: editor,
    translated: translated,
  },
  methods: {
    onSwitch: function (key) {
      this.cur = key
    },
    onSave: function () {
      saveLrc(this.content, (err, title, tags, _id) => {
        if (err) return popError(err)
      })
    },
    onSetNow: function () {
      service.setNow({
        content: this.content
      }, (err) => {
        if (err) return popError(err)

        page('/now')
      })
    }
  },
})