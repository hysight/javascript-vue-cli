const colorList = ['#afa3f5', '#00d488', '#3feed4', '#3bafff', '#f1bb4c', '#aff', "rgba(250,250,250,0.5)"];
const option = {
  title: {
    subtext: '报警占比',
    x: 'center',
    y: '43%',
    textStyle: {
      fontSize: 18,
      fontWeight: 'normal',
      color: ['#333']
    },
    subtextStyle: {
      color: '#f1bb4c',
      fontSize: 16
    },
  },
  grid: {
    bottom: 0,
    left: 0,
    right: 0
  },
  legend: {
    show: false,
    // orient: 'vertical',
    top: "middle",
    right: "5%",
    textStyle: {
      color: '#f2f2f2',
      fontSize: 12,

    },
    icon: 'roundRect'
  },
  series: [
    // 主要展示层的
    {
      radius: ['29%', '49%'],
      center: ['50%', '50%'],
      type: 'pie',
      itemStyle: {
        normal: {
          color: function (params) {
            return colorList[params.dataIndex]
          }
        }
      },
      labelLine: {
        normal: {
          show: true,
          length: 40,
          length2: 45,
          lineStyle: {
            color: '#d3d3d3'
          },
          align: 'right'
        },
        color: "#000",
        emphasis: {
          show: true
        }
      },
      label: {
        normal: {
          formatter: function (params) {
            var str = '';
            switch (params.name) {
              case '烟雾传感器': str = '烟雾传感器' + params.value + '%'; break;
              case '火焰传感器': str = '火焰传感器' + params.value + '%'; break;
              case '一氧化碳传感器': str = '一氧化碳传感器' + params.value + '%'; break;
              case '震动传感器': str = '震动传感器' + params.value + '%'; break;
              case '雨滴传感器': str = '雨滴传感器 ' + params.value + '%'; break;
              case '蜂鸣器传感器': str = '蜂鸣器传感器 ' + params.value + '%'; break;
            }
            return str
          },
          padding: [0, -90],
          height: 35,
          rich: {
            a: {
              width: 38,
              height: 38,
              lineHeight: 50,

              align: 'left'
            },
            b: {
              width: 29,
              height: 45,
              lineHeight: 50,
              align: 'left'
            },
            c: {
              width: 34,
              height: 33,
              lineHeight: 50,

              align: 'left'
            },
            d: {
              width: 34,
              height: 44,
              lineHeight: 50,
              align: 'left'
            },
            e: {
              width: 38,
              height: 30,
              lineHeight: 50,
              align: 'left'
            },
            nameStyle: {
              fontSize: 16,
              color: "#555",
              align: 'left'
            },
            rate: {
              fontSize: 20,
              color: "#1ab4b8",
              align: 'left'
            }
          }
        }
      },
      data: [
        {
          value: 17,
          name: '烟雾传感器',
        },
        { value: 23, name: '火焰传感器' },
        { value: 27, name: '一氧化碳传感器' },
        { value: 33, name: '震动传感器' },
        { value: 9, name: '雨滴传感器' },
        { value: 9, name: '蜂鸣器传感器' }],
    },
    // 边框的设置
    {
      radius: ['44%', '49%'],
      center: ['50%', '50%'],
      type: 'pie',
      label: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      labelLine: {
        normal: {
          show: false
        },
        emphasis: {
          show: false
        }
      },
      animation: false,
      tooltip: {
        show: false
      },
      itemStyle: {
        normal: {
          color: 'rgba(250,250,250,0.5)'
        }
      },
      data: [{
        value: 1,
      }],
    }
  ]
};
export default option;