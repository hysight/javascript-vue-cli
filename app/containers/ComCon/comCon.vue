<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-05-20 14:54:15
 * @LastEditTime: 2019-05-20 15:02:57
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="com-con">
    <TagGroup />
  </div>
</template>

<script>
// components
import TagGroup from 'app/components/TagGroup/index.vue';
// css
import './style.scss';
export default {
  name: "com-con",
  data() {
    return {};
  },
  components: {
      TagGroup
  }
};
</script>