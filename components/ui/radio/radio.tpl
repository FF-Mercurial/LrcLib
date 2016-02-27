<i class="ui-radio
          fa fa-{{ checked === value ? 'dot-' : '' }}circle-o
          {{ customClass || '' }}"
   title="{{ title }}"
   v-class="ui-radio--disabled: disabled"
   v-on="click: _onCheck"></i>