<i class="ui-checkbox
          fa fa-{{ checked ? 'check-' : '' }}square-o
          {{ customClass }}"
   title="{{ title }}"
   v-class="ui-checkbox--disabled: disabled"
   v-on="click: _onCheck"></i>