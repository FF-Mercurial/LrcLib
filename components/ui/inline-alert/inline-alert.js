var opt = {
    template: __inline('./inline-alert.tpl'),
    replace: false,
    methods: {
        onClose: function () {
            $(this.$el).empty();
        }
    },
    data: {
        msg: '',
        color: '',
    }
};

module.exports = function (container, msg, color) {
    opt.el = container;
    opt.data.msg = msg;
    opt.data.color = color || 'danger'
    new Vue(opt);
};