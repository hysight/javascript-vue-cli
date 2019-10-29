<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-20 14:15:33
 * @LastEditTime: 2019-05-20 14:17:21
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="tag-test">
    <span>tag标签:</span>
    <div class="tag-wrap">
      <ul class="tag-ul">
        <li v-for="(item, index) in tagArr" :key="index">
          <span>{{item}}</span>
          <i class="iconfont iconguanbi" @click="deleteItem(index)"/>
        </li>
      </ul>
      <div class="add-btn-wrap">
        <p v-if="hideBol" @click="controlDisplay">
          <i class="iconfont icontianjia"/>
          <span>New Tag</span>
        </p>
        <input
          class="tag-input"
          ref="tagInput"
          v-else
          @blur="confirmTag($event)"
          @keyup.enter="confirmTag($event)"
        >
      </div>
    </div>
  </div>
</template>

<script>
// css
import './style.scss';
export default {
  name: "tag-group",
  data() {
    return {
      tagArr: ["标签一", "标签二", "标签三"],
      hideBol: true
    };
  },
  methods: {
    deleteItem(index) {
      this.tagArr.splice(index, 1);
    },
    controlDisplay() {
      this.hideBol = !this.hideBol;
    },
    confirmTag(event, bool) {
      const newTagVal = event.target.value;
      newTagVal && this.tagArr.push(newTagVal);
      this.tagArr = Array.from(new Set(this.tagArr));
      this.hideBol = true;
    }
  }
};
</script>
<style>
</style>