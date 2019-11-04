<template>
  <div class="flow-detail">
    <Spin size="large"
          fix
          v-if="loading"></Spin>
    <DragItem v-for="key in Object.keys(dataList)"
              :key="key"
              :itemId="key"
              mode='view'
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
                style="fill: rgba(154, 201, 244, 0.5);" />
        </marker>
      </defs>
      <path v-for="(c, i) in connects"
            :key="i"
            :d="c.d"
            fill="none"
            :stroke="'rgba(154, 201, 244, 0.5)'"
            :stroke-width="1"
            marker-end="url(#markerArrow)"></path>
    </svg>
  </div>
</template>

<script>
  import DragItem from "app/containers/DragCon/DragItem/dragItem.vue";
  // api
  import { getFlowDetailApi } from "app/api/drag";
  // css
  import './style.scss';
  export default {
    name: 'FlowDetail',
    data () {
      return {
        dataList: {},
        lineList: {},
        result: {},
        connects: [],
        loading: true
      };
    },
    components: {
      DragItem
    },
    created () {
      this.getFlowDetail();
    },
    destroy () {
      this.initData();
    },
    methods: {
      // 初始化数据
      initData () {
        this.dataList = {};
        this.lineList = {};
        this.result = {};
        this.connects = [];
      },
      // 获取详情数据
      getFlowDetail () {
        const { query } = this.$route;
        const params = {
          chartId: query.chartId
        };
        getFlowDetailApi(params)
          .then(res => {
            const design = JSON.parse(res.design);
            this.result = res.data;
            this.dataList = design.dataList;
            this.lineList = design.lineList;
            this.loading = false;
            this.drawConnection(this.lineList);
          })
          .catch(error => {
            this.$Message.error(error);
          });
      },
      // 画线
      drawConnection (data) {
        this.connects = [];
        Object.keys(data).forEach(key => {
          const c = {};
          c.d = this.computeLine(data[key]);
          this.connects.push(c);
        });
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
  }
</script>