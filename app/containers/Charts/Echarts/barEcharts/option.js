const option = {
  color: ['#f9951a', '#60e4c2', '#36c57d', '#2e73ff'],
  legend: {
    data: [
      {
        name: '建设单位',
        icon: 'circle'
      },
      {
        name: '施工单位',
        icon: 'circle'
      },
      {
        name: '监理',
        icon: 'circle'
      },
      {
        name: '工人',
        icon: 'circle'
      },
    ],
    top: 10,
    textStyle: {
      color: '#555',
      fontSize: 12
    },
    itemGap: 10,
    itemWidth: 10,
    itemHeight: 10
  },
  grid: {
    left: 50,
    right: 20,
    bottom: 30,
    top: 50
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: '#fff',
    padding: [0, 0, 0, 0],
    textStyle: {
      color: '#333'
    },
    axisPointer: {
      type: 'line',
      animation: true,
      lineStyle: {
        color: 'transparent'
      }
    },
    extraCssText: 'box-shadow: 0px 0px 10px -4px rgba(3, 3, 3, .4)',
    formatter: (params, ticket, callback) => {
      let htmls = '',
        xaxisName = '';
      if (params.length > 0) {
        xaxisName = params[0].axisValue;
        htmls += '<div style="font-size:16px;height:32px;color:#0069FF;border-radius:4px;line-height:36px;padding-left:15px;text-align: left;">' + xaxisName + '</div><div>';
        for (let j = 0; j < params.length; j++) {
          htmls += '<p style="font-size:14px;padding:4px 23px 6px 15px;color:#333;text-align: left;">' + params[j].seriesName + ' : ' + params[j].data + '%</p>';
        }
        htmls += '</div>';
        return htmls;
      }
    }
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#C0C0C5'
      }
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      fontSize: 13,
      color: '#5F5F6B'
    },
    data: ['7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7']
  },
  yAxis: {
    name: '',
    type: 'value',
    nameRotate: 1,
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#C0C0C5'
      }
    },
    axisTick: {
      show: true
    },
    axisLabel: {
      fontSize: 13,
      color: '#5F5F6B'
    }
  },
  series: [
    {
      name: '建设单位',
      type: 'bar',
      stack: 'a',
      barWidth: '30%',
      data: ['200', '300', '300', '200', '200', '300', '180']
    },
    {
      name: '施工单位',
      type: 'bar',
      stack: 'a',
      barWidth: '30%',
      data: ['300', '400', '300', '200', '300', '300', '280']
    },
    {
      name: '监理',
      type: 'bar',
      stack: 'a',
      barWidth: '30%',
      data: ['300', '200', '300', '200', '200', '300', '260']
    },
    {
      name: '工人',
      type: 'bar',
      stack: 'a',
      barWidth: '30%',
      data: ['400', '460', '420', '430', '420', '460', '520']
    }
  ]
};
export default option;