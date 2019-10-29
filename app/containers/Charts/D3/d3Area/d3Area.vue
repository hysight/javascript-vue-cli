<template>
  <div class="d3-area"
       ref="d3Area"></div>
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: 'd3Area',
    data () {
      return {
        areaData: [10, 30, 25, 12, 43, 25, 18, 12]
      };
    },
    mounted () {
      this.drawArea();
    },
    methods: {
      drawArea () {
        const _this = this
        const width = 320
        const height = 300
        const padding = {
          left: 30,
          right: 30,
          top: 20,
          bottom: 20
        }
        const svg = d3.select(this.$refs.d3Area)
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        const xScale = d3.scaleBand().domain(['1月', '2月', '3月', '4月', '5月', '6月']).range([0, width - padding.left - padding.right])
        const yScale = d3.scaleLinear().domain([d3.min(_this.areaData), d3.max(_this.areaData)]).range([height - padding.bottom - padding.top, 0])
        const xAxis = d3.axisBottom().scale(xScale)
        const yAxis = d3.axisLeft().scale(yScale)
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + (height - padding.bottom) + ')')
          .call(xAxis)
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
          .call(yAxis)

        // 颜色渐变
        const defs = svg.append('defs')
        const linearGradient = defs.append('linearGradient')
          .attr('id', 'linearColor')
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '0%')
          .attr('y2', '0%')
          .attr('y2', '100%')
        const a = d3.rgb(235, 0, 233)
        const b = d3.rgb(133, 0, 187)
        linearGradient.append('stop')
          .attr('offset', '0%')
          .style('stop-color', 'white')
          .transition().duration(2000)
          .style('stop-color', a.toString())
        linearGradient.append('stop')
          .style('stop-color', 'white')
          .transition().duration(2000)
          .attr('offset', '100%')
          .style('stop-color', b.toString())
        const area = d3.area()
          .x(function (d, i) { return padding.left + (width - padding.left - padding.right) / _this.areaData.length * (i + 0.5) })
          .y(function (d, i) { return height - padding.bottom })
          .y1(function (d, i) { return yScale(d) })
          .curve(d3.curveBasis)
        svg.append('path')
          .attr('d', area(_this.areaData))
          .style('fill', 'url(#' + linearGradient.attr('id') + ')')
      }
    }
  }
</script>