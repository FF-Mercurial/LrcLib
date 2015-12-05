<div class="w-path-bar">
  <ol class="breadcrumb">
    <li v-repeat="node in path"
        v-class="active: $index === path.length - 1">
      <a href="{{ node.href }}" v-if="$index !== path.length - 1">{{ node.text }}</a>
      <content v-if="$index === path.length - 1">{{ node.text }}</content>
    </li>
  </ol>
</div>