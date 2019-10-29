<template>
  <div class="pie-echarts"
       ref="pieEcharts"></div>
</template>

<script>
  import echarts from 'echarts';
  // option
  import option from './option';
  export default {
    name: 'pieEcharts',
    data () {
      return {};
    },
    mounted () {
      const echartsDiv = this.$refs['pieEcharts'];
      const echartsPro = echarts.init(echartsDiv);
      echartsPro.setOption(option);
    }
  }
</script>