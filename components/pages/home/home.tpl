<div class="p-home">
  <component is="searchBar"
             on-clear-lrcs="{{ onClearLrcs }}"
             on-lrc="{{ onLrc }}"
             v-ref="search-bar"></component>
  <component is="pagination"
             cur="{{@ cur }}"
             total="{{ total }}"
             v-ref="pagination"></component>
  <component is="lrcEditor"
             content="{{@ lrcs[cur] }}"></component>
</div>