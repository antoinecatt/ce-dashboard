import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { history } from '../../history';
class LineChart extends Component {
  state = {
    options: {
      chart: {
        height: 450,
        width: '100%',
        type: 'bar',
        background: '#f4f4f4',
        foreColor: '#333'
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      xaxis: {
        categories: [
          '6am',
          '7am',
          '8am',
          '9am',
          '10am',
          '11am',
          '12pm',
          '1pm',
          '2pm',
          '3pm'
        ]
      },
      fill: {
        colors: ['#F44336']
      },
      dataLabels: {
        enabled: false
      },

      title: {
        text: 'Temperature History',
        align: 'center',
        margin: 20,
        offsetY: 20,
        style: {
          fontSize: '25px'
        }
      }
    },
    series: [
      {
        name: 'Temperature',
        data: [
          ...history.map((val, i) => {
            console.log(val);
            return val[i];
          })
        ]
      }
    ]
  };

  render() {
    return (
      <div>
        <Chart series={this.state.series} options={this.state.options} />
      </div>
    );
  }
}

export default LineChart;
