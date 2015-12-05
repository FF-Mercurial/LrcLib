var draggable = require('directives/draggable'),
    pop = require('ui/pop');

var opts = {
    template: __inline('./pop-alert.tpl'),
    data: {},
    directives: {
        draggable: draggable
    },
    ready: function () {
        var that = this;
        
        $(that.$$.ok).focus();
    }
};

module.exports = function (option, cb) {
    if (typeof option === 'string') option = { content: option };

    option.confirmText = option.confirmText || '确定';
    option.color = option.color || 'danger';

    pop(opts, option);
};