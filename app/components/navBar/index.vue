<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-14 15:55:12
 * @LastEditTime: 2019-05-16 17:09:49
 * @LastEditors: jiannan.lv
 -->
<template>
  <ul class="nav-wrap">
    <li v-for="item in navConfig" :key="item.path" active-class='aaa'>
      <router-link :to="item.path">
        <i :class="item.icon"></i>
        <span>{{item.name}}</span>
      </router-link>
    </li>
    
  </ul>
</template>

<script>
import navConfig from "./navConfig";
// css
import "./style.scss";
export default {
  data() {
    return {
      navConfig
    };
  }
};
</script>