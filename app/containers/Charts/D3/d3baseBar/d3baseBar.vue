<template>
  <div class="d3-base-svg"
       ref="d3BaseBar" />
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: 'd3BarSvg',
    data () {
      return {
        data: [4, 6, 12, 10, 8, 1, 9],
        width: 320,
        barHeight: 20,
        height: 300
      };
    },
    mounted () {
      this.drawD3Bar();
    },
    methods: {
      //画图
      drawD3Bar () {
        // 常量
        const width = this.width - 15;
        const height = this.height;
        const chartData = this.data;
        const barHeight = this.barHeight;
        const chartSvg = d3.select(this.$refs.d3BaseBar)
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px');
        // x轴
        const xScale = d3.scaleLinear()
          .domain([0, d3.max(chartData)])
          .range([0, width]);
        // 矩形和label文字组合的容
        const g = chartSvg.selectAll('g')
          .data(chartData)
          .enter().append('g')
          .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')' });
        // 添加矩形
        g.append('rect')
          .attr("x", 15)
          .attr("y", 30)
          .attr('width', xScale)
          .attr('height', barHeight - 5)
          .attr('fill', 'green');
        // 添加label文字
        g.append('text')
          .attr('x', function (d) { return xScale(d) === width ? xScale(d) - 20 : xScale(d) })
          .attr('y', barHeight + 18)
          .attr('dy', '0.3em')
          .attr('fill', '#fff')
          .style('font-size', '12px')
          .text(function (d) { return d });
      }
    }
  }
</script>
