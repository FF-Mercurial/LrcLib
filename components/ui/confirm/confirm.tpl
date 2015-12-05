<div class="ui-confirm" v-draggable cancel="a">
  <div class="alert alert-{{ color }} alert-dismissable">
    <h4>{{ title }}</h4>
    <p>{{{ content }}}</p>
    <p v-show="opt">
      <component is="checkbox"
                 checked="{{@ optChecked }}"></component>
      <span>{{ opt }}</span>
    </p>
    <p>
      <a class="btn btn-{{ color }}" href="javascript:" v-on="click: _onConfirm" v-el="confirm">{{ confirmText }}</a>
      <a class="btn btn-link" href="javascript:" v-on="click: _onCancel">{{ cancelText }}</a>
    </p>
  </div>
</div>