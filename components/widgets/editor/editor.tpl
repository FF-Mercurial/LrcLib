<div class="w-editor">
  <textarea class="w-editor__input form-control"
            spellcheck="false"
            v-model="content"
            v-on="input: onTouch,
                  change: onTouch"
            debounce="207"></textarea>
</div>