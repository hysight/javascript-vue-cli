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
      <li title="线"
          @click="lineTonggle()"
          :class="lineBool ? 'line-draw-active' : ''">
        <i class="iconfont iconline" />
      </li>
      <li title="标尺"
          :class="scaleBool ? 'line-draw-active' : ''"
          @click="scaleTonggle()">
        <i class="iconfont iconscale" />
      </li>
      <li title="网格"
          :class="gridBool ? 'line-draw-active' : ''"
          @click="griddTonggle()">
        <i class="iconfont icongridding" />
      </li>
    </ul>
    <p class="save-p"
       title="保存"
       @click="handleSaveChart">
      <i class="iconfont iconsave" />
    </p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  // api
  import { saveChartApi } from "app/api/drag";
  // mrthod
  import { _UUID } from 'app/utils/tools';
  // css
  import "./style.scss";
  export default {
    name: "tools-wrap",
    data () {
      return {};
    },
    computed: {
      ...mapGetters("drag", {
        lineBool: "lineBool",
        scaleBool: "scaleBool",
        gridBool: "gridBool",
        dataList: "dataList",
        lineList: "lineList"
      })
    },
    created () {
      this.updateLineBool(false);
    },
    methods: {
      ...mapActions("drag", {
        updateScaleBool: "updateScaleBool",
        updateGridBool: "updateGridBool",
        updateLineBool: "updateLineBool"
      }),
      // 控制标尺显隐
      scaleTonggle () {
        this.updateScaleBool();
      },
      // 控制网格显隐
      griddTonggle () {
        this.updateGridBool();
      },
      // 是否划线
      lineTonggle () {
        this.updateLineBool();
      },
      // 保存图表信息
      handleSaveChart () {
        const { query } = this.$route;
        const design = {
          dataList: this.dataList,
          lineList: this.lineList
        };
        const params = {
          chartId: query.chartId,
          design: JSON.stringify(design),
          type: query.chartId ? 'update' : 'add'
        };
        saveChartApi(params)
          .then(res => {
            this.$Message.info(res);
          })
          .catch(error => {
            this.$Message.error(error);
          });
      }
    }
  };
</script>