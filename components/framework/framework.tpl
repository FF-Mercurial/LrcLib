<div class="f-framework">
  <component is="header" cur-page="{{ curPage }}"></component>
  <div class="f-framework__page container">
    <component is="page-{{ curPage }}"
               v-if="pageExists(curPage)"
               v-ref="page"
               params="{{ params }}"></component>
    <component is="404"
               v-if="!pageExists(curPage)"></component>
  </div>
</div>