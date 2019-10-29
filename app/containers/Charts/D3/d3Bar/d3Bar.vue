<template>
  <div id="d3-bar-svg" />
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: 'd3BarSvg',
    data () {
      return {
        barData: [9, 18, 12, 26, 32, 44, 25, 18, 36]
      };
    },
    mounted () {
      this.drawD3Bar();
    },
    methods: {
      drawD3Bar () {
        // 模拟数据
        const _this = this
        const width = 320
        const height = 300
        const rectPad = 5
        const padding = {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        };
        // 初始化svg画布
        const svg = d3.select('#d3-bar-svg')
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        // 创建比例尺
        const min = d3.min(_this.barData) - 5
        const max = d3.max(_this.barData) + 5
        const xScale = d3.scaleBand().domain(d3.range(_this.barData.length)).range([0, width - padding.left - padding.right])
        const yScale = d3.scaleLinear().domain([min, max]).range([0, height - padding.top - padding.bottom])
        const yScaleAxis = d3.scaleLinear().domain([min, max]).range([height - padding.top - padding.bottom, 0]) // 坐标轴值域取反，因为坐标原点在左上角
        // 设置x轴 y轴
        const xAxis = d3.axisBottom().scale(xScale)
        const yAxis = d3.axisLeft(yScaleAxis)
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
        // 添加柱状图
        svg.selectAll('rect')
          .data(_this.barData)
          .enter()
          .append('rect')
          // 设置矩形从x,y轴哪一点开始绘制
          .attr('y', function (d, i) { return height - padding.bottom - yScale(d) })
          .attr('x', function (d, i) {
            return padding.left + xScale(i) + rectPad / 2
          })
          // 设置矩形宽高
          .attr('width', xScale.bandwidth() - rectPad)
          .attr('height', 0)
          // 添加鼠标移入移出事件，有个填充简便的效果
          .on('mouseover', function (d, i) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('fill', 'yellow')
          })
          .on('mouseout', function (d, i) {
            d3.select(this)
              .transition()
              .duration(500)
              .attr('fill', 'steelblue')
          })
          .transition()
          .delay(function (d, i) {
            return i * 200
          })
          .attr('height', function (d, i) {
            return yScale(d)
          })
          .attr('fill', 'steelblue')
        // 添加文字，同理
        svg.selectAll('.MyText')
          .data(_this.barData)
          .enter()
          .append('text')
          .attr('class', 'MyText')
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .attr('y', function (d, i) { return height - padding.bottom - yScale(d) })
          .attr('x', function (d, i) {
            return padding.left + (width - padding.left - padding.right) / _this.barData.length * i
          })
          .attr('dx', (width - padding.left - padding.right) / _this.barData.length / 2)
          .attr('dy', function (d, i) {
            return '1.2em'
          })
          .text(function (d) {
            return d
          })
      }
    }
  }
</script>