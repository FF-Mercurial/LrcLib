module.exports = {
    bind: function () {
        Vue.nextTick(() => $(this.el).focus())
    },
};