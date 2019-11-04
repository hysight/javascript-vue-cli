<!--
 * @Description: 
 * @Author: jiannan.lv
 * @Date: 2019-06-27 14:28:02
 * @LastEditTime: 2019-07-03 11:46:14
 * @LastEditors: jiannan.lv
 -->
<template>
  <div class="scale-plate"
       :class="scaleBool ? '' : 'hide-scale-plate'">
    <canvas class="scaleplateX"
            height="20px"
            ref="scalePlateX" />
    <canvas class="scaleplateY"
            width="20px"
            ref="scalePlateY" />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  // css
  import "./style.scss";
  export default {
    name: "scale-plate",
    props: {
      dragRegionConfig: Object
    },
    watch: {
      dragRegionConfig (newConfig, oldConfig) {
        this.dragRegionConfig = newConfig;
        this.drawAxes();
      }
    },
    computed: {
      ...mapGetters("drag", {
        scaleBool: "scaleBool"
      })
    },
    data () {
      return {};
    },
    methods: {
      // 画标尺Fn
      drawAxes () {
        const rulerCanvasX = this.$refs["scalePlateX"];
        const rulerCanvasY = this.$refs["scalePlateY"];
        const ctxX = rulerCanvasX.getContext("2d");
        const ctxY = rulerCanvasY.getContext("2d");
        rulerCanvasX.setAttribute("width", parseInt(this.dragRegionConfig.width));
        rulerCanvasY.setAttribute(
          "height",
          parseInt(this.dragRegionConfig.height)
        );
        ctxX.fillStyle = "#eef2f5";
        ctxX.fillRect(0, 0, this.dragRegionConfig.width, ctxX.canvas.height);
        ctxX.save();
        ctxX.strokeStyle = "#b0b1b3";
        ctxX.lineWidth = 1;

        ctxY.fillStyle = "#eef2f5";
        ctxY.fillRect(0, 0, ctxY.canvas.width, this.dragRegionConfig.height);
        ctxY.save();
        ctxY.strokeStyle = "#b0b1b3";
        ctxY.lineWidth = 1;

        this.drawHorizontalAxis(ctxX, rulerCanvasX);
        this.drawVerticalAxis(ctxY, rulerCanvasY);

        ctxX.lineWidth = 0.5;
        ctxX.strokeStyle = "#b0b1b3";
        ctxY.lineWidth = 0.5;
        ctxY.strokeStyle = "#b0b1b3";

        this.drawVerticalAxisTicks(ctxY, rulerCanvasY);
        this.drawHorizontalAxisTicks(ctxX, rulerCanvasX);

        ctxX.restore();
        ctxY.restore();
      },

      // 画横坐标
      drawHorizontalAxis (ctx, canvas) {
        ctx.beginPath();
        ctx.moveTo(0, 20);
        ctx.lineTo(this.dragRegionConfig.width, 20);
        ctx.closePath();
        ctx.stroke();
      },

      // 画纵坐标
      drawVerticalAxis (ctx, canvas) {
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(20, this.dragRegionConfig.height);
        ctx.closePath();
        ctx.stroke();
      },

      //画横坐标刻度
      drawVerticalAxisTicks (ctx, canvas) {
        let deltaX;
        for (let i = 0; i < this.dragRegionConfig.height / 10; ++i) {
          ctx.beginPath();
          if (i % 4 === 0) {
            deltaX = 10;
            ctx.moveTo(0, 10 * i);
            ctx.lineTo(0, 10 * i);
            ctx.textAlign = "left";
            ctx.fillStyle = "#828282";
            ctx.fillText(i * 10, 2, 10 + 10 * i, 13);
          } else {
            deltaX = 10 / 2;
          }
          ctx.moveTo(20 - deltaX, i * 10);
          ctx.lineTo(20, i * 10);
          ctx.closePath();
          ctx.stroke();
        }
      },

      //画纵坐标刻度
      drawHorizontalAxisTicks (ctx, canvas) {
        let deltaY;
        for (let i = 0; i < this.dragRegionConfig.width / 10; ++i) {
          ctx.beginPath();
          if (i % 4 === 0) {
            deltaY = 10;
            ctx.moveTo(10 * i, 0);
            ctx.lineTo(10 * i, 0);
            ctx.textAlign = "left";
            ctx.fillStyle = "#828282";
            ctx.fillText(i * 10, 10 * i, 11);
          } else {
            deltaY = 10 / 2;
          }
          ctx.moveTo(i * 10, 20 - deltaY);
          ctx.lineTo(i * 10, 20);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  };
</script>