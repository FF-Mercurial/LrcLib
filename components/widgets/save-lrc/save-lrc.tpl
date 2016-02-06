<div class="w-save-lrc">
  <div class="panel panel-primary">
    <div class="panel-heading">保存歌词</div>
    <div class="panel-body">
      <div class="w-save-lrc__field">
        <label>标题</label>
        <input class="form-control"
               v-model="title" 
               v-on="input: clearAlert,
                     change: clearAlert,
                     keydown: _onSubmit | key 13"
               v-el="titleInput">
      </div>
      <div class="w-save-lrc__field">
        <label>标签</label>
        <component is="tagsInput"
                   tags="{{@ tags }}"
                   on-change="{{ clearAlert }}"
                   on-enter="{{ _onSubmit }}"></component>
      </div>
      <div class="w-save-lrc__field">
        <label>搜索标签</label>
        <component is="tagsInput"
                   tags="{{@ searchTags }}"
                   on-change="{{ clearAlert }}"
                   on-enter="{{ _onSubmit }}"></component>
      </div>
      <div class="w-save-lrc__field text-right">
        <button class="btn btn-normal" v-on="click: closePop">取消</button>
        <button class="btn btn-primary" v-on="click: _onSubmit">提交</button>
      </div>
      <div v-el="alert"></div>
    </div>
  </div>
</div>