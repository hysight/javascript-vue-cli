<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-10-17 15:20:02
 * @LastEditTime: 2019-10-17 15:24:49
 * @LastEditors: jiannan.lv
 -->
<template>
<div class="sub-header">{{text}}</div>
</template>

<script>
// css
import './style.scss';
export default {
  name: 'subHeader',
  props: {
    text: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data () {
    return {};
  }
}

</script>