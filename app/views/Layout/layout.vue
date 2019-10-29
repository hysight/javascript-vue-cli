<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-10-15 17:53:40
 * @LastEditTime: 2019-10-17 17:46:25
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="layout">
    <Header-Com />
    <div class="layout-content-wrap">
      <SideCom />
      <div class="content"
           :class="sideBarTroggle ? 'content-active' : ''">
        <sub-header :text="subHeaderText"></sub-header>
        <div class="content-wrap">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import HeaderCom from "app/components/HeaderCom";
  import SubHeader from 'app/components/subHeader/subheader.vue';
  import SideCom from "app/components/SideCom";
  import './style.scss';
  export default {
    name: 'layout',
    data () {
      return {};
    },
    computed: {
      ...mapGetters("common", {
        sideBarTroggle: "sideBarTroggle"
      }),
      subHeaderText () {
        return this.$route.meta.name;
      }

    },
    components: {
      HeaderCom,
      SideCom,
      SubHeader
    }
  }

</script>