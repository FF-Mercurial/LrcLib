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
             v-ref="lrcEditor"
             content="{{@ lrcs[cur] }}"
             edit="edit"></component>
</div>