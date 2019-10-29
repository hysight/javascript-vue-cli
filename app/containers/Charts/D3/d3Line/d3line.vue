<template>
  <div class="d3-line"
       ref="d3Line"></div>
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: 'd3Line',
    data () {
      return {
        lineData: [10, 30, 25, 12, 43, 25, 18, 36]
      };
    },
    mounted () {
      this.drawLine();
    },
    methods: {
      drawLine () {
        const _this = this
        const width = 320
        const height = 300
        const padding = {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        }
        // 初始化svg画布
        // 处理数据更新做的判断
        const svg = d3.select(this.$refs.d3Line)
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        const min = d3.min(_this.lineData) - 5;
        const max = d3.max(_this.lineData) + 5;
        // 比例尺
        const xScale = d3.scaleBand().domain(['1月', '2月', '3月', '4月', '5月', '6月']).range([0, width - padding.left - padding.right])
        const yScale = d3.scaleLinear().domain([min, max]).range([height - padding.top - padding.bottom, 0]) // 值域取反
        const xAxis = d3.axisBottom().scale(xScale)
        const yAxis = d3.axisLeft(yScale)
        // 添加x轴
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
          .call(xAxis)
        // 添加y轴
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
          .call(yAxis)
        // 设置折线
        const line = d3.line()
          .x(function (d, i) {
            return padding.left + (width - padding.left - padding.right) / _this.lineData.length * (i + 0.5)
          })
          .y(function (d, i) {
            return yScale(d)
          })
          .curve(d3.curveBasis)
        // 绘制折现路径
        svg.append('path')
          .attr('d', line(_this.lineData))
          .attr('stroke', 'red')
          .attr('stroke-width', '4px')
          .attr('fill', 'none')
          .attr('class', 'line') // 添加动画
      }
    }
  }
</script>

<style>
</style>