<template>
  <div class="echarts">
    <page-header text="echarts图表"></page-header>
    <div class="echarts-wrap charts-wrap">
      <div>
        <bar-echarts></bar-echarts>
      </div>
      <div>
        <pie-echarts></pie-echarts>
      </div>
      <div>
        <line-echarts></line-echarts>
      </div>
      <div>
        <quid-echarts></quid-echarts>
      </div>
      <div>
        <guage-echarts></guage-echarts>
      </div>
    </div>
    <page-header text="high-charts图表"></page-header>
    <div class="highcharts-wrap charts-wrap">
      <div>
        <bar-charts></bar-charts>
      </div>
      <div>
        <pie-charts></pie-charts>
      </div>
      <div>
        <bar3d-charts></bar3d-charts>
      </div>
      <div>
        <pie3d-charts></pie3d-charts>
      </div>
      <div>
        <line-charts></line-charts>
      </div>
    </div>
    <page-header text="d3图表"></page-header>
    <div class="d3-wrap charts-wrap">
      <div>
        <d3base-bar></d3base-bar>
      </div>
      <div>
        <d3-bar></d3-bar>
      </div>
      <div>
        <d3-line></d3-line>
      </div>
      <div>
        <d3-area></d3-area>
      </div>
      <div>
        <d3-pie></d3-pie>
      </div>
    </div>
  </div>
</template>

<script>
  // components
  import PageHeader from 'app/components/PageHeader/pageHeader.vue';
  // charts
  // echarts
  import BarEcharts from 'app/containers/Charts/Echarts/barEcharts/barEcharts.vue';
  import PieEcharts from 'app/containers/Charts/Echarts/pieEcharts/pieEcharts.vue';
  import LineEcharts from 'app/containers/Charts/Echarts/lineEcharts/lineEcharts.vue';
  import QuidEcharts from 'app/containers/Charts/Echarts/quidEcharts/quidEcharts.vue';
  import GuageEcharts from 'app/containers/Charts/Echarts/guageEcharts/guageEcharts.vue';
  // highcharts
  import BarCharts from 'app/containers/Charts/HighCharts/barCharts/barCharts.vue';
  import Bar3dCharts from 'app/containers/Charts/HighCharts/bar3dCharts/bar3dCharts.vue';
  import PieCharts from 'app/containers/Charts/HighCharts/pieCharts/pieCharts.vue';
  import Pie3dCharts from 'app/containers/Charts/HighCharts/pie3dCharts/pie3dCharts.vue';
  import LineCharts from 'app/containers/Charts/HighCharts/lineCharts/lineCharts.vue';
  // d3
  import D3Bar from 'app/containers/Charts/D3/d3Bar/d3Bar.vue';
  import D3baseBar from 'app/containers/Charts/D3/d3baseBar/d3baseBar.vue';
  import D3Line from 'app/containers/Charts/D3/d3Line/d3Line.vue';
  import D3Area from 'app/containers/Charts/D3/d3Area/d3Area.vue';
  import D3Pie from 'app/containers/Charts/D3/d3Pie/d3Pie.vue';
  // css
  import './style.scss';
  export default {
    name: 'echarts',
    data () {
      return {};
    },
    components: {
      PageHeader,
      BarEcharts,
      PieEcharts,
      LineEcharts,
      QuidEcharts,
      GuageEcharts,
      BarCharts,
      Bar3dCharts,
      PieCharts,
      Pie3dCharts,
      LineCharts,
      D3Bar,
      D3baseBar,
      D3Line,
      D3Area,
      D3Pie
    }
  }
</script>