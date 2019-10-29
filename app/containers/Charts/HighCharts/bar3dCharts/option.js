const option = {
  chart: {
    type: 'column',
    options3d: {
      enabled: true,
      alpha: 15,
      beta: 15,
      viewDistance: 25,
      depth: 40
    },
    marginTop: 80,
    marginRight: 40
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  title: {
    text: '以性别划分的水果消费总量'
  },
  xAxis: {
    categories: ['苹果', '橘子', '梨', '葡萄', '香蕉']
  },
  yAxis: {
    allowDecimals: false,
    min: 0,
    title: {
      text: '水果数量'
    }
  },
  tooltip: {
    headerFormat: '<b>{point.key}</b><br>',
    pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} / {point.stackTotal}'
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      depth: 40
    }
  },
  series: [{
    name: '小张',
    data: [5, 3, 4, 7, 2],
    stack: 'male'
  }, {
    name: '小王',
    data: [3, 4, 4, 2, 5],
    stack: 'male'
  }, {
    name: '小彭',
    data: [2, 5, 6, 2, 1],
    stack: 'female'
  }, {
    name: '小潘',
    data: [3, 0, 4, 4, 3],
    stack: 'female'
  }]
};
export default option;