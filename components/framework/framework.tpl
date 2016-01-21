<div class="f-framework">
  <component is="header" cur-page="{{ curPage }}"></component>
  <div class="f-framework__page container">
    <component is="page-home"
               v-ref="page-home"
               v-if="curPage === 'home'"></component>
    <component is="page-lib"
               v-ref="page-lib"
               qs="{{ qs }}"
               v-if="curPage === 'lib'"></component>
    <component is="page-now"
               v-ref="page-now"
               v-if="curPage === 'now'"></component>
  </div>
</div>