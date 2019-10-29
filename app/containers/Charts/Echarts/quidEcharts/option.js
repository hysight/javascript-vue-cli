const value = 0.48;
const data = [value, value];
const option = {
  graphic: [{
    type: 'group',
    left: 'center',
    bottom: 10,
    children: [{
      type: 'text',
      z: 100,
      left: '10',
      top: 'middle',
      style: {
        fill: '#000',
        text: '磁盘剩余空间：',
        font: '16px Microsoft YaHei'
      }
    }, {
      type: 'text',
      z: 100,
      left: '120',
      top: 'middle',
      style: {
        fill: '#000',
        text: '128G',
        font: '24px Microsoft YaHei'
      }
    }]
  }],
  series: [{
    type: 'liquidFill',
    radius: '70%',
    center: ['50%', '40%'],
    data: data,
    backgroundStyle: {
      borderWidth: 5,
      borderColor: '#1daaeb',
      color: '#fff'
    },
    label: {
      normal: {
        formatter: (value * 100).toFixed(2) + '%',
        textStyle: {
          fontSize: 20
        }
      }
    }
  }]
};
export default option;