import saveLrc from 'widgets/save-lrc'
import editor from 'widgets/editor'
import translated from 'widgets/translated'
import popError from 'widgets/pop-error'
import * as service from 'service'

const colors = {
  'red': '#DA4453',
  'r': '#DA4453',
  'green': '#8CC152',
  'g': '#8CC152',
  'blue': '#4A89DC',
  'b': '#4A89DC',
  'cyan': '#37BC9B',
  'c': '#37BC9B',
  'yellow': '#F6BB42',
  'y': '#F6BB42',
  'orange': '#E9573F',
  'o': '#E9573F',
  'purple': '#967ADC',
  'pp': '#967ADC',
  'p': '#967ADC',
  'pink': '#D770AD',
  'pk': '#D770AD',
  'black': '#333',
  'bl': '#333'
}

export default Vue.extend({
  template: __inline('./lrc-editor.tpl'),
  props: ['content', 'no-save', 'edit'],
  data: function () {
    return {
      tabs: ['原文', '翻译'],
      cur: '原文',
      colors: colors
    }
  },
  computed: {
    dirty: {
      get: function () {
        return this.$.editor.dirty
      },
      set: function (val) {
        this.$.editor.dirty = val
      }
    },
    displayingColors: function () {
      let res = {}
      let colorToIds = {}

      for (let id in this.colors) {
        let color = this.colors[id]
        colorToIds[color] = colorToIds[color] || []
        colorToIds[color].push(id)
      }

      for (let color in colorToIds) {
        let ids = colorToIds[color]
        res[ids.join('/')] = color
      }

      return res
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
      saveLrc(this.content, (_id) => {
        this.dirty = false
        page('/lib?_id=' + _id)
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
  ready: function () {
    if (!this.edit) this.cur = '翻译'
  }
})