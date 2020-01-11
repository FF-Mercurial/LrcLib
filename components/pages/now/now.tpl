<div class="p-now">
  <div class="p-now__field" v-show="lrc.content">
    <label>歌词</label>
    <component is="lrcEditor" v-ref="lrcEditor" content="{{@ lrc.content }}" no-save="no-save" v-if="lrc"></component>
  </div>
  <div v-show="!lrc.content">没有当前歌词</div>
</div>