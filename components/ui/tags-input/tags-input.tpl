<input class="form-control"
       v-el="input"
       v-on="change: _onChange,
             keydown: _onEnter | key 13"
       placeholder="逗号分隔">