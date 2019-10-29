<template>
  <div class="d3-pie"
       ref="d3Pie"></div>
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: "d3Pie",
    data () {
      return {
        pieData: [{
          name: '小米',
          value: 60.8
        }, {
          name: '华为',
          value: 20.8
        }, {
          name: '联想',
          value: 30.4
        }, {
          name: '三星',
          value: 40.8
        }, {
          name: '苹果',
          value: 90.8
        }, {
          name: '其他',
          value: 100.8
        }]
      };
    },
    mounted () {
      this.drawPie();
    },
    methods: {
      drawPie () {
        const _this = this
        const width = 320
        const height = 300
        const svg = d3.select(this.$refs.d3Pie)
          .append('svg')
          .attr('width', width + 'px')
          .attr('height', height + 'px')
        const pie = d3.pie()
          .value((d) => d.value)
        // 数据转化
        const pieData = pie(_this.pieData)
        const outerRadius = width / 2.8
        const innerRadius = 0
        // 创建弧生成器
        const arc = d3.arc()
          .innerRadius(outerRadius)
          .outerRadius(innerRadius)
        const color = d3.interpolateCool
        const arcs = svg.selectAll('g')
          .data(pieData)
          .enter()
          .append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        arcs.append('path')
          .attr('fill', function (d, i) { return color(i) })
          .attr('d', function (d, i) { return arc(d) })
          // 设置动画,还未看懂这部分内容的参数部分
          .transition()
          .duration(4000)
          .attrTween('d', function (d, i) {
            let fn = d3.interpolateObject({
              endAngle: d.startAngle
            }, d)
            return function (i) {
              return arc(fn(i))
            }
          })
        // 添加文字value
        arcs.append('text')
          .attr('transform', function (d) {
            let x = arc.centroid(d)[0] * 1.4
            let y = arc.centroid(d)[1] * 1.4
            return 'translate(' + x + ',' + y + ')'
          })
          .attr('text-anchor', 'middle')
          .attr('font-size', '14')
          .text(function (d) {
            return d.value
          })
        // 添加文字name
        arcs.append('text')
          .attr('transform', function (d) {
            let x = arc.centroid(d)[0] * 2.5
            let y = arc.centroid(d)[1] * 2.5
            return 'translate(' + x + ',' + y + ')'
          })
          .attr('text-anchor', 'middle')
          .attr('font-size', '14')
          .text(function (d) {
            return d.data.name
          })
        // 添加直线
        arcs.append('line')
          .attr('stroke', 'black')
          .attr('stroke-width', '2px')
          .attr('x1', function (d) { return arc.centroid(d)[0] * 2 })
          .attr('y1', function (d) { return arc.centroid(d)[1] * 2 })
          .attr('x2', function (d) { return arc.centroid(d)[0] * 2.3 })
          .attr('y2', function (d) { return arc.centroid(d)[1] * 2.3 })
      }
    }
  }
</script>