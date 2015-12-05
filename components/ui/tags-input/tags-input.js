module.exports = Vue.extend({
    template: __inline('./tags-input.tpl'),
    props: ['tags', 'on-enter', 'on-change'],
    watch: {
        tags: function (tags) {
            this.$$.input.value = tags.join(', ');
        },
    },
    methods: {
        _onEnter: function () {
            this.onEnter && this.onEnter();
        },
        _onChange: function (evt) {
            this.tags = this.$$.input.value.split(',').map(trim);
            this.onChange && this.onChange();
        }
    },
});

function trim(str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
}