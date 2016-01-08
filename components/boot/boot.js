import framework from 'framework'

export default function () {
  Vue.config.debug = true
  framework($('#container')[0])
}