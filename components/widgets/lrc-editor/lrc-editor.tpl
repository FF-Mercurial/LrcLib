<div class="w-lrc-editor">
  <div class="w-lrc-editor__colors">
    字体颜色: 
    <span class="w-lrc-editor__color" v-repeat="displayingColors" style="color: {{ $value }}">{{ $key }}</span>
  </div>
  <ul class="nav nav-tabs">
    <li v-repeat="tab in tabs"
        v-class="active: cur === tab"
        v-on="click: onSwitch(tab)">
      <a href="javascript:;">{{ tab }}</a>
    </li>
    <li v-on="click: onSetNow">
      <a href="javascript:;">设为当前</a>
    </li>
    <li v-on="click: onSave" v-if="!noSave">
      <a href="javascript:;">保存</a>
    </li>
    <li v-on="click: onView">
      <a href="javascript:;">查看大图</a>
    </li>
  </ul>
  <div class="w-lrc-editor__container">
    <div class="w-lrc-editor__tab"
         v-class="w-lrc-editor--active:cur === '原文'">
      <component is="editor"
                 v-ref="editor"
                 content="{{@ content }}"></component>
    </div>
    <div class="w-lrc-editor__tab"
         v-class="w-lrc-editor--active:cur === '翻译'">
      <component is="translated"
                 v-ref="translated"
                 colors="{{ colors }}"
                 content="{{ content }}"></component>
    </div>
  </div>
</div>