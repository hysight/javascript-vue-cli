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
        <defs>
          <marker id="markerArrow"
                  markerWidth="8"
                  markerHeight="8"
                  refX="8"
                  refY="4"
                  orient="auto">
            <path d="M0,0 L8,4 L0,8 z"
                  style="fill: #ccc;" />
          </marker>
        </defs>
        <path v-for="(c, i) in connects"
              :key="i"
              :d="c.d"
              fill="none"
              :stroke="'#ccc'"
              :stroke-width="1"
              marker-end="url(#markerArrow)"></path>
      </svg>
    </div>
    <CanvasGrid :canvasConfig="canvasConfig" />
    <context-menu></context-menu>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
  import svg from "svg";
  // containers
  import CanvasGrid from "../CanvasGrid/canvasGrid.vue";
  import DragItem from "../DragItem/dragItem.vue";
  import ContextMenu from '../ContextMenu/contextMenu.vue';
  // api
  import { getFlowDetailApi } from "app/api/drag";
  // css
  import "./style.scss";
  export default {
    name: "draw-region",
    data () {
      return {
        canvasConfig: {}
        // connects: []
      };
    },
    computed: {
      ...mapGetters("drag", {
        dataList: "dataList",
        lineList: "lineList",
        unitItem: 'unitItem'
      }),
      connects () {
        return this.drawConnection(this.lineList);
      }
    },
    // watch: {
    //   lineList (val) {
    //     this.drawConnection(val);
    //   }
    // },
    components: {
      CanvasGrid,
      DragItem,
      ContextMenu
    },
    mounted () {
      this.getCanvasConfig();
    },
    methods: {
      ...mapActions("drag", {
        selectDragItem: "selectDragItem",
        addItemToDataList: "addItemToDataList",
        initDataList: 'initDataList',
        initLineList: 'initLineList',
        updateContextMenu: "updateContextMenu",
        updateEditBool: 'updateEditBool'
      }),
      // 获取流程详情
      getFlowDetail () {
        const { query } = this.$route;
        const params = {
          chartId: query.chartId
        };
        if (!query.chartId) return;
        getFlowDetailApi(params)
          .then(res => {
            const design = JSON.parse(res.design);
            const dataList = design.dataList;
            const lineList = design.lineList;
            this.initDataList(dataList);
            this.initLineList(lineList);
          })
          .catch(error => {
            this.$Message.error(error);
          });
      },
      // 画布的点击事件
      drawRegionClick () {
        const params = {
          left: 0,
          top: 0,
          show: false
        };
        this.selectDragItem("");
        this.updateContextMenu(params);
        this.updateEditBool(false);
      },
      // 获取画布宽高
      getCanvasConfig () {
        const drawRegion = this.$refs["drawRegion"];
        const drawRegionW = drawRegion.clientWidth;
        const drawRegionH = drawRegion.clientHeight;
        this.canvasConfig = {
          height: drawRegionH,
          width: drawRegionW
        };
        this.getFlowDetail();
      },
      // 画布上的drop事件
      onDrop (e) {
        this.addItemToDataList({ e, unitItem: this.unitItem });
      },
      // 画线
      drawConnection (data) {
        // this.connects = [];
        const connects = [];
        Object.keys(data).forEach(key => {
          const c = {};
          c.d = this.computeLine(data[key]);
          connects.push(c);
        });
        return connects;
      },
      // 画线
      computeLine (lineItem) {
        const centerx = (lineItem.x2 - lineItem.x1) / 3;
        const x1 = lineItem.x1;
        const y1 = lineItem.y1;
        const point1x = lineItem.x1 + centerx + 20;
        const point1y = lineItem.y1;
        const point2x = point1x + centerx - 100;
        const point2y = lineItem.y2;
        const x2 = lineItem.x2;
        const y2 = lineItem.y2;
        const path = `M ${x1} ${y1} C ${parseInt(point1x)} ${point1y}, ${parseInt(point2x)} ${point2y} ${x2} ${y2}`;
        return path;
      }
    }
  };
</script>