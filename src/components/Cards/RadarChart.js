import React, { Component } from 'react';
import Chart from 'react-apexcharts';


class RadarChart extends Component {
  state = {
    options: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    },
    series: [{
      name: 'Series 1',
      data: [80, 50, 30, 40, 100, 20],
    }]
  }
  

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="radar"
          height="350"
        />
      </div>
    );
  }
}

export default RadarChart;
