var vm = null
var count = 0

var opt = {
  template: __inline('./loading.tpl'),
  ready: function () {
    var $spinner = $(this.$$.spinner)
    $spinner.css('margin-top', -$spinner.outerHeight() / 2 + 'px')
    $spinner.css('margin-left', -$spinner.outerWidth() / 2 + 'px')
  }
}

exports.show = function () {
  if (++count === 1) {
    var $container = $('<div>')
    $('body').append($container)
    opt.el = $container[0]
    vm = new Vue(opt)
  }
}

exports.hide = function () {
  if (--count === 0) vm.$remove()
}