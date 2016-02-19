<div class="p-lrc">
  <div class="p-lrc__field">
    <label>标题</label>
    <input class="form-control" v-model="lrc.title">
  </div>
  <div class="p-lrc__field">
    <label>标签</label>
    <component is="tagsInput" tags="{{@ lrc.tags }}"></component>
  </div>
  <div class="p-lrc__field">
    <label>搜索标签</label>
    <component is="tagsInput" tags="{{@ lrc.searchTags }}"></component>
  </div>
  <div class="p-lrc__field">
    <label>歌词{{ lrc.isImg ? ' (这份歌词是图片格式, 不支持编辑)' : '' }}</label>
    <div class="p-lrc__img-container" v-if="lrc.isImg">
      <img class="p-lrc__img" v-attr="src: lrc.content | url">
    </div>
    <component is="lrcEditor" v-ref="lrcEditor" content="{{@ lrc.content }}" no-save="no-save" v-if="!lrc.isImg"></component>
  </div>
  <div class="p-lrc__field">
    <button class="btn btn-primary" v-on="click: onSubmit">修改</button>
    <button class="btn btn-danger" v-on="click: onRemove">删除</button>
    <span class="p-lrc__hint" v-el="hint">修改成功!</span>
  </div>
</div>