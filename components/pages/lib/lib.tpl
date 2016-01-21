<div class="p-lib">
  <component is="lrcList" v-if="!atLrc"></component>
  <component is="viewLrc" v-ref="viewLrc" _id="{{ qs._id }}" v-if="atLrc"></component>
</div>