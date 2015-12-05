<div class="ui-pop-alert" v-draggable cancel="a">
  <div class="alert alert-{{ color }} alert-dismissable">
    <button type="button" class="close" data-dismiss="alert" aria-hidden="true" v-on="click: closePop">×</button> 
    <h4 v-show="title">{{ title }}</h4>
    <p>{{{ content }}}</p>
    <p>
      <a class="btn btn-{{ color }}" href="javascript:" v-on="click: closePop" v-el="ok">{{ confirmText }}</a>
    </p>
  </div>
</div>