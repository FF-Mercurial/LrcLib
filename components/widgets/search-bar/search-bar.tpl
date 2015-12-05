<div class="w-search-bar"
     v-class="w-search-bar--pad: !searching">
  <i class="w-search-bar__icon fa"
     v-class="fa-search: !searching,
              fa-spinner: searching,
              fa-pulse: searching"></i>
  <input type="text"
         class="w-search-bar__input form-control"
         v-attr="disabled: searching"
         placeholder="输入关键词回车搜索"
         v-model="wd"
         v-on="keydown: onSearch | key 13"
         v-auto-focus>
  <div class="progress w-search-bar__progress"
       v-if="searching">
    <div class="progress-bar" v-el="progress"></div>
  </div>
</div>