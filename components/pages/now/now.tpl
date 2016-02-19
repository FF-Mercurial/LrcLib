<div class="p-now">
  <div class="p-now__field" v-show="lrc.content">
    <!--
    <label>歌词{{ lrc.isImg ? ' (这份歌词是图片格式, 不支持编辑)' : '' }}</label>
    -->
    <div class="p-now__img-container" v-if="lrc.isImg">
      <img class="p-now__img" v-attr="src: lrc.content | url">
    </div>
    <component is="lrcEditor" v-ref="lrcEditor" content="{{@ lrc.content }}" no-save="no-save" v-if="lrc && !lrc.isImg"></component>
  </div>
  <div v-show="!lrc.content">没有当前歌词</div>
</div>