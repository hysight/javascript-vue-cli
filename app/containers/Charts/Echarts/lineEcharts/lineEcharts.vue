<template>
  <div class="line-echarts"
       ref="lineEcharts"></div>
</template>

<script>
  import echarts from 'echarts';
  // option
  import option from './option';
  export default {
    name: 'lineEcharts',
    data () {
      return {};
    },
    mounted () {
      const echartsDiv = this.$refs['lineEcharts'];
      const echartsPro = echarts.init(echartsDiv);
      echartsPro.setOption(option);
    }
  }
</script>