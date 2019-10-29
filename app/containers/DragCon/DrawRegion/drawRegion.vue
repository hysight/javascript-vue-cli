<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 13:47:03
 * @LastEditTime: 2019-07-04 15:45:40
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="draw-region"
       id="drawRegion"
       ref="drawRegion"
       @click="drawRegionClick()">
    <div class="draw-region-content"
         @drop="onDrop"
         @dragover.prevent>
      <DragItem v-for="key in Object.keys(dataList)"
                :key="key"
                :itemId="key"
                :itemData="dataList[key]" />
      <svg class="svg"
           height="100%"
           width="100%">
        <line v-for="key in Object.keys(lineList)"
              :key="key"
              :x1='lineList[key].x1'
              :y1="lineList[key].y1"
              :x2="lineList[key].x2"
              :y2="lineList[key].y2"
              style="stroke: #9e9e9e;stroke-width:1" />
      </svg>
    </div>
    <CanvasGrid :canvasConfig="canvasConfig" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import svg from "svg";
  // containers
  import CanvasGrid from "../CanvasGrid/canvasGrid.vue";
  import DragItem from "../DragItem/dragItem.vue";
  // css
  import "./style.scss";
  export default {
    name: "draw-region",
    data() {
      return {
        canvasConfig: {}
      };
    },
    computed: {
      ...mapGetters("drag", {
        dataList: "dataList",
        lineList: "lineList"
      })
    },
    methods: {
      ...mapActions("drag", {
        selectDragItem: "selectDragItem",
        addItemToDataList: "addItemToDataList"
      }),
      // 画布的点击事件
      drawRegionClick() {
        this.selectDragItem("");
      },
      // 获取画布宽高
      getCanvasConfig() {
        const drawRegion = this.$refs["drawRegion"];
        const drawRegionW = drawRegion.clientWidth;
        const drawRegionH = drawRegion.clientHeight;
        this.canvasConfig = {
          height: drawRegionH,
          width: drawRegionW
        };
      },
      // 画布上的drop事件
      onDrop(e) {
        this.addItemToDataList(e);
      }
    },
    mounted() {
      this.getCanvasConfig();
    },
    components: {
      CanvasGrid,
      DragItem
    }
  };
</script>