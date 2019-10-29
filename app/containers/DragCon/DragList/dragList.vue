<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 11:12:45
 * @LastEditTime: 2019-07-01 18:57:16
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="drag-list"
       :class="openBol ? 'open-drag-list' : ''">
    <i class="iconfont "
       :class="openBol ? 'iconclose' : 'iconopen'"
       :title="openBol ? '收起' : '展开'"
       @click="dragListTonggle()" />
    <p class="drag-title">列表</p>
    <div class="drag-item-list"
         draggable="true"
         @dragstart="dragStart" />
  </div>
</template>

<script>
  // css
  import "./style.scss";
  export default {
    name: "drag-list",
    data() {
      return {
        openBol: false
      };
    },
    methods: {
      dragListTonggle() {
        this.openBol = !this.openBol;
      },
      dragStart() {
        console.log(121212);
      }
    }
  };
</script>