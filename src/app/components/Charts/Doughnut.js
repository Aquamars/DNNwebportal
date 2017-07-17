import React, {Component} from 'react';
import RC2 from 'react-chartjs2';
import { Card, CardTitle } from 'material-ui/Card';

let data = {
  labels: [
    'Red',
    'Blue',
    'Yellow',
    'pink'
  ],
  datasets: [{
    data: [300, 50, 100,80],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#F55E56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#F55E56'
    ]
  }]
};

class Doughnut extends Component {
  render() {
    let chartlabels = []
    let chartData = []
    for(let key in this.props.data) { 
        chartlabels.push(key)
        chartData.push(this.props.data[key])
    }
    // console.log(chartlabels,chartData)
    data.labels = chartlabels
    data.datasets[0].data = chartData
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title={this.props.title} />
        <RC2 data={this.props.data} type='doughnut' />
      </Card>
    );
  }
}

export default Doughnut;