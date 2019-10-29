<template>
  <div class="bar-echarts"
       id="barCharts"></div>
</template>

<script>
  import Highcharts from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';
  // option
  import option from './option';
  export default {
    name: 'barCharts',
    data () {
      return {};
    },
    mounted () {
      Exporting(Highcharts);
      Highcharts.chart('barCharts', option);
    }
  }
</script>