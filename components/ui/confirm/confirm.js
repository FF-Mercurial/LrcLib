var pop = require('ui/pop'),
    draggable = require('directives/draggable'),
    checkbox = require('ui/checkbox');

var opts = {
    template: __inline('./confirm.tpl'),
    data: {
        optChecked: false,
    },
    components: {
        checkbox: checkbox
    },
    directives: {
      draggable: draggable
    },
    ready: function () {
        var that = this;
        
        that.onPopClose = function () {
            that.onCancel();
        };

        $(that.$$.confirm).focus();
    },
    methods: {
        _onConfirm: function () {
            this.onConfirm(this.optChecked);
            this.closePop();
        },
        _onCancel: function () {
            this.onCancel();
            this.closePop();
        }
    },
};

module.exports = function (option, cb) {
    option.confirmText = option.confirmText || '确定';
    option.cancelText = option.cancelText || '取消';
    option.color = option.color || 'warning';
    option.opt = option.opt || '';

    pop(opts, option, {
        onConfirm: function (optChecked) {
            cb(true, optChecked);
        },
        onCancel: function () {
            cb(false);
        }
    });
};