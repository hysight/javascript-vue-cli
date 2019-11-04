<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 11:44:23
 * @LastEditTime: 2019-07-05 11:39:55
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="drag-region"
       ref="dragRegion">
    <DrawRegion />
    <ScalePlate :dragRegionConfig="dragRegionConfig" />
    <Tools />
  </div>
</template>

<script>
  // containers
  import DrawRegion from "../DrawRegion/drawRegion.vue";
  import ScalePlate from "../ScalePlate/scalePlate.vue";
  import Tools from "../Tools/tools.vue";
  // css
  import "./style.scss";
  export default {
    name: "drag-region",
    data () {
      return {
        dragRegionConfig: {}
      };
    },
    methods: {
      // 获取拖拽区域宽高
      getDragRegionConfig () {
        const dragRegion = this.$refs["dragRegion"];
        const dragRegionW = dragRegion.clientWidth;
        const dragRegionH = dragRegion.clientHeight;
        this.dragRegionConfig = {
          height: dragRegionH,
          width: dragRegionW
        };
      }
    },
    mounted () {
      this.getDragRegionConfig()
    },
    components: {
      DrawRegion,
      ScalePlate,
      Tools
    }
  };
</script>