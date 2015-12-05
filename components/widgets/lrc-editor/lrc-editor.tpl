<div class="w-lrc-editor">
  <ul class="nav nav-tabs">
    <li v-repeat="tab in tabs"
        v-class="active: cur === tab"
        v-on="click: onSwitch(tab)">
      <a href="javascript:;">{{ tab }}</a>
    </li>
    <li v-on="click: onSave" v-if="!noSave">
      <a href="javascript:;">保存</a>
    </li>
  </ul>
  <div class="w-lrc-editor__container">
    <div class="w-lrc-editor__tab"
         v-class="w-lrc-editor--active:cur === '原文'">
      <component is="editor"
                 content="{{@ content }}"></component>
    </div>
    <div class="w-lrc-editor__tab"
         v-class="w-lrc-editor--active:cur === '翻译'">
      <component is="translated"
                 content="{{ content }}"></component>
    </div>
  </div>
</div>