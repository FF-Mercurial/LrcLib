<div class="w-view-lrc">
  <div class="w-view-lrc__field" v-if="_id">
    <label>标题</label>
    <input class="form-control" v-model="lrc.title">
  </div>
  <div class="w-view-lrc__field" v-if="_id">
    <label>标签</label>
    <component is="tagsInput" tags="{{@ lrc.tags }}"></component>
  </div>
  <div class="w-view-lrc__field" v-if="lrc">
    <label>歌词{{ lrc.isImg ? ' (这份歌词是图片格式, 不支持编辑)' : '' }}</label>
    <div class="w-view-lrc__img-container" v-if="lrc.isImg">
      <img class="w-view-lrc__img" v-attr="src: lrc.content | url">
    </div>
    <component is="lrcEditor" v-ref="lrcEditor" content="{{@ lrc.content }}" no-save="no-save" v-if="!lrc.isImg"></component>
  </div>
  <div v-if="!lrc && !_id">没有当前歌词</div>
  <div class="w-view-lrc__field" v-if="_id">
    <button class="btn btn-success" v-on="click: onSetNow">设为当前</button>
    <button class="btn btn-primary" v-on="click: onSubmit">修改</button>
    <button class="btn btn-danger" v-on="click: onRemove">删除</button>
    <span class="w-view-lrc__hint" v-el="hint">修改成功!</span>
  </div>
</div>