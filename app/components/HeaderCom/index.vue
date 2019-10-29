<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-09 11:20:46
 * @LastEditTime: 2019-10-17 14:26:36
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="header" id="header-com">
    <div class="logo-part">
      <i class="iconfont iconcaidan" @click="controlDisplay"/>
      <span class="header-title">webSystem</span>
    </div>
    <div class="user-part">
      <div class="img-wrap">
        <img class="user-img" src="public/images/user.png" alt="">
      </div>
      <div class="user-name">
        <p>admin</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import "./style.scss";
export default {
  name: "header-com",
  data() {
    return {};
  },
  methods: {
    ...mapActions("common", {
      updateTroggleStatus: "updateTroggleStatus"
    }),
    controlDisplay() {
      this.updateTroggleStatus()
    }
  }
};
</script>
<style>
</style>