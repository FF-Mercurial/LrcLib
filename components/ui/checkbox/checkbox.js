module.exports = Vue.extend({
    template: __inline('./checkbox.tpl'),
    props: ['checked', 'custom-class', 'on-check', 'title', 'dont-set', 'disabled'],
    methods: {
        _onCheck: function () {
            if (this.disabled) return;
            this.dontSet || (this.checked = !this.checked);
            this.onCheck && this.onCheck(this.checked);
        }
    }
});