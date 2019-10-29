<template>
  <div class="pie-charts"
       id="pieCharts"></div>
</template>

<script>
  import Highcharts from 'highcharts';
  import Exporting from 'highcharts/modules/exporting';
  // option
  import option from './option';
  export default {
    name: 'pieCharts',
    data () {
      return {};
    },
    mounted () {
      Exporting(Highcharts);
      Highcharts.chart('pieCharts', option);
    }
  }
</script>