var pscroll = require('directives/pscroll');

var INTV = 309;

module.exports = function (componentOpts, componentData, componentMethods) {
    var $el = $('<div>');

    $(document.body).append($el);

    new Vue({
        template: __inline('./pop.tpl'),
        el: $el[0],
        methods: {
            onClose: function (evt) {
                if (!evt || evt.target === this.$$.container) this.closePop();
            },
            closePop: function () {
                var that = this;

                $(this.$el).animate({ opacity: 0 }, INTV, function () {
                    that.$remove();
                });
            }
        },
        directives: {
            pscroll: pscroll
        },
        ready: function () {
            var that = this,
                $component = $(that.$$.component);

            // 初始化component
            componentOpts = deepCopy(componentOpts);
            componentOpts.el = $component[0];
            componentOpts.replace = false;
            if (typeof componentOpts.data === 'function') componentOpts.data = componentOpts.data();
            if (!componentOpts.data) componentOpts.data = {};
            if (componentData) patch(componentOpts.data, componentData);
            if (!componentOpts.methods) componentOpts.methods = {};
            if (componentMethods) patch(componentOpts.methods, componentMethods);
            patch(componentOpts.methods, {
                closePop: function () {
                    that.closePop();
                }
            })
            new Vue(componentOpts);

            // 居中
            $component.css('margin-top', -$component.outerHeight() / 2 + 'px');
            $component.css('margin-left', -$component.outerWidth() / 2 + 'px');
            // 淡入
            $(that.$el).css({opacity: 0}).animate({opacity: 1}, INTV);
        }
    });
};

function deepCopy(obj) {
    var res;

    if (obj === null) {
        res = null;
    } else if (obj instanceof Array) {
        res = [];

        obj.forEach(function (item) {
            res.push(deepCopy(item));
        });
    } else if (typeof obj === 'object') {
        res = {};

        for (var key in obj) res[key] = deepCopy(obj[key])
    } else {
        res = obj;
    }

    return res;
}

function patch(to, from) {
    for (var key in from) to[key] = from[key];

    return to;
}