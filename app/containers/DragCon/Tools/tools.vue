<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-07-03 11:23:20
 * @LastEditTime: 2019-07-03 13:30:56
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="tools-wrap">
    <ul>
      <li title="线" @click="lineTonggle()" :class="lineBool ? 'line-draw-active' : ''"> 
        <i class="iconfont iconline" />
      </li>
      <li title="标尺"
          @click="scaleTonggle()">
        <i class="iconfont iconscale" />
      </li>
      <li title="网格"
          @click="griddTonggle()">
        <i class="iconfont icongridding" />
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  // css
  import "./style.scss";
  export default {
    name: "tools-wrap",
    data() {
      return {};
    },
    computed: {
      ...mapGetters("drag", {
        lineBool: "lineBool"
      })
    },
    methods: {
      ...mapActions("drag", {
        updateScaleBool: "updateScaleBool",
        updateGridBool: "updateGridBool",
        updateLineBool: "updateLineBool"
      }),
      // 控制标尺显隐
      scaleTonggle() {
        this.updateScaleBool();
      },
      // 控制网格显隐
      griddTonggle() {
        this.updateGridBool();
      },
      // 是否划线
      lineTonggle() {
        this.updateLineBool();
      }
    }
  };
</script>