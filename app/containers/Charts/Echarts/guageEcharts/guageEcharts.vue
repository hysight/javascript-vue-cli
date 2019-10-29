<template>
  <div class="guage-echarts"
       ref="guageEcharts"></div>
</template>

<script>
  import echarts from 'echarts';
  // option
  import option from './option';
  export default {
    name: 'guageEcharts',
    data () {
      return {};
    },
    mounted () {
      const echartsDiv = this.$refs['guageEcharts'];
      const echartsPro = echarts.init(echartsDiv);
      echartsPro.setOption(option);
    }
  }
</script>