/**
 * checkbox
 * 使用方法: 在你的组件中引用, 传入下列参数
 *   checked: 双向绑定一个data, radio group的选中值
 *   value: 这个radio的值, 通常绑定一个data, 也可以是常量
 *   on-check: 可选钩子, 绑定一个method, 在点击时调用, 并传入参数(value: 这个radio的值)
 *   on-second-check: 可选钩子, 绑定一个method, 在两次点击同一个radio时调用, 可以用来实现'可清空的radio'
 *   title: 可选, string, hover时的提示文字
 *   disabled: 可选, boolean, 是否禁用
 *   dont-set: 可选, boolean, 若为true, 则状态不会改变(但不显示为禁用)
 *   custom-class: 可选, string, 自定义class, 用于自定义样式, e.g.: 'class1 class2'
 * your-component.js:
 *   module.exports = Vue.extend({
 *     ...
 *     components: {
 *       ...
 *       radio: require('pc/ui/radio')
 *       ...
 *     },
 *     data: function () {
 *       ...
 *       checked: 'value1',
 *       values: [
 *         'value1',
 *         'value2'
 *       ]
 *       ...
 *     },
 *     methods: {
 *       ...
 *       onCheck: function (value) {
 *         alert('the value of the radio is: ' + value)
 *       },
 *       onSecondCheck: function () {
 *         // this.checked = undefined
 *         // 上面这一句可以用来实现可清空的radio
 *         alert('you click the same radio')
 *       },
 *       ...
 *     },
 *     ...
 *   })
 * your-component.tpl:
 *   <component is="checkbox" v-repeat="value in values" value ="{{ value }}" checked="{{@ checked }}" on-check="{{ onCheck }}" on-second-check="{{ onSecondCheck }}">
 */

module.exports = Vue.extend({
    template: __inline('./radio.tpl'),
    props: ['checked', 'value', 'custom-class', 'on-check', 'on-second-check', 'title', 'dont-set', 'disabled'],
    methods: {
        _onCheck: function () {
            var secondChecked = this.checked === this.value;
            
            if (this.disabled) return;
            this.dontSet || (this.checked = this.value);
            this.onCheck && this.onCheck(this.value);
            secondChecked && this.onSecondCheck && this.onSecondCheck();
        }
    }
});