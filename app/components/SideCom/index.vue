<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-09 13:26:30
 * @LastEditTime: 2019-05-20 15:50:19
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="side-com" :class="sideBarTroggle ? 'side-com-active' : ''">
    <navBar/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// components
import navBar from "app/components/navBar/index.vue";
// css
import "./style.scss";
export default {
  name: "side-com",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("common", {
      sideBarTroggle: "sideBarTroggle"
    })
  },
  components: {
    navBar
  }
};
</script>