<div class="w-lrc-list">
  <div class="w-lrc-list__local-search">
    <component is="localSearch" v-ref="localSearch"></component>
  </div>
  <div class="w-lrc-list__list">
    <div v-repeat="lrc in displayingLrcs"
         class="w-lrc-list__item">
      <div class="w-lrc-list__item-title"><a href="/p/lib?_id={{ lrc._id }}">{{ lrc.title }}</a></div>
      <div class="w-lrc-list__item-tags">{{ lrc.tags | tag }}</div>
    </div>
  </div>
</div>