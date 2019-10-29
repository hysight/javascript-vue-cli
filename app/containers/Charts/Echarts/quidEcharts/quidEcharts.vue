<template>
  <div class="quid-echarts"
       ref="quidEcharts"></div>
</template>

<script>
  import echarts from 'echarts';
  import 'echarts-liquidfill';
  // option
  import option from './option';
  export default {
    name: 'quidEcharts',
    data () {
      return {};
    },
    mounted () {
      const echartsDiv = this.$refs['quidEcharts'];
      const echartsPro = echarts.init(echartsDiv);
      echartsPro.setOption(option);
    }
  }
</script>