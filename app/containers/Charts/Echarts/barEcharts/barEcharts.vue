<template>
  <div class="bar-echarts"
       ref="barEcharts"></div>
</template>

<script>
  import echarts from 'echarts';
  // option
  import option from './option';
  export default {
    name: 'barEcharts',
    data () {
      return {};
    },
    mounted () {
      const echartsDiv = this.$refs['barEcharts'];
      const echartsPro = echarts.init(echartsDiv);
      echartsPro.setOption(option);
    }
  }
</script>