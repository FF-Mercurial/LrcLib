<div class="w-header">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="/p/home">LrcLib</a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav"
            v-repeat="page in pages">
          <li v-class="active: curPage === page.id ||
                               (page.alias && page.alias.indexOf(curPage) !== -1)">
            <a href="/p/{{ page.id }}">{{ page.text }}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</div>