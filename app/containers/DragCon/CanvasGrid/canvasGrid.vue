<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 13:52:34
 * @LastEditTime: 2019-07-03 11:48:43
 * @LastEditors: jiannan.lv
 -->
<template>
  <canvas class="canvas-grid"
          :class="gridBool ? '' : 'hide-canvas-grid'"
          ref="canvasGrid" />
</template>

<script>
  import { mapGetters } from "vuex";
  // css
  import "./style.scss";
  export default {
    name: "canvas-grid",
    props: {
      canvasConfig: Object
    },
    watch: {
      canvasConfig(newConfig, oldConfig) {
        this.canvasConfig = newConfig;
        this.drawGrid();
      }
    },
    computed: {
      ...mapGetters("drag", {
        gridBool: "gridBool"
      })
    },
    data() {
      return {};
    },
    methods: {
      // 渲染画布网格
      drawGrid() {
        const cw = parseInt(this.canvasConfig.width);
        const ch = parseInt(this.canvasConfig.height);
        const step = 10;

        const canvas = this.$refs["canvasGrid"];
        const ctx = canvas.getContext("2d");
        canvas.setAttribute("width", cw);
        canvas.setAttribute("height", ch);

        ctx.save();

        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = "#e2e2e2";
        for (let i = step; i < ctx.canvas.width; i += step) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, ctx.canvas.height);
          ctx.closePath();
          ctx.stroke();
        }

        for (let j = step; j < ctx.canvas.height; j += step) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(ctx.canvas.width, j);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  };
</script>