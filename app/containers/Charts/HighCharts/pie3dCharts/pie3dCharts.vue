<template>
  <div class="pie3d-charts"
       id="pie3dCharts"></div>
</template>

<script>
  import Highcharts from 'highcharts';
  import Highcharts3D from 'highcharts/highcharts-3d';
  // option
  import option from './option';
  export default {
    name: 'pie3dCharts',
    data () {
      return {};
    },
    mounted () {
      Highcharts3D(Highcharts);
      Highcharts.chart('pie3dCharts', option);
    }
  }
</script>