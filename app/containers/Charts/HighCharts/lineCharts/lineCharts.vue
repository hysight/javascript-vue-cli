<template>
  <div class="line-charts"
       id="lineCharts"></div>
</template>

<script>
  import Highcharts from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';
  // option
  import option from './option';
  export default {
    name: 'lineCharts',
    data () {
      return {};
    },
    mounted () {
      Exporting(Highcharts);
      Highcharts.chart('lineCharts', option);
    }
  }
</script>