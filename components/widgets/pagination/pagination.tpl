<div class="w-pagination">
  <ul class="pagination">
    <li v-class="disabled: cur <= 0"
        v-on="click: onGoto(cur - 1)">
      <a href="javascript:;" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li v-repeat="total"
        v-class="active: cur === $index"
        v-on="click: onGoto($index)">
      <a href="javascript:;">{{ $index + 1 }}</a>
    </li>
    <li v-class="disabled: cur >= total - 1"
        v-on="click: onGoto(cur + 1)">
      <a href="javascript:;">&raquo;</a>
    </li>
  </ul>
</div>