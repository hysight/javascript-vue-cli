<template>
  <div class="bar3d-echarts"
       id="bar3dCharts"></div>
</template>

<script>
  import Highcharts from 'highcharts';
  import Highcharts3D from 'highcharts/highcharts-3d';
  // option
  import option from './option';
  export default {
    name: 'bar3dCharts',
    data () {
      return {};
    },
    mounted () {
      Highcharts3D(Highcharts);
      Highcharts.chart('bar3dCharts', option);
    }
  }
</script>