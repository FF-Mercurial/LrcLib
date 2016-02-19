<div class="p-lrcs">
  <div class="p-lrcs__local-search">
    <component is="localSearch" v-ref="localSearch"></component>
  </div>
  <div class="p-lrcs__list">
    <div v-repeat="lrc in displayingLrcs"
         class="p-lrcs__item">
      <div class="p-lrcs__item-title"><a href="/p/lrc/{{ lrc._id }}">{{ lrc.title }}</a></div>
      <div class="p-lrcs__item-tags">{{ lrc.tags | tag }}</div>
    </div>
  </div>
</div>