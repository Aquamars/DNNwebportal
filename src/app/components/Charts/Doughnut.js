import React, {Component} from 'react';
import RC2 from 'react-chartjs2';
import { Card, CardTitle } from 'material-ui/Card';
import {randomColors} from '../../utils/ColorHandler'
import CircularProgress from 'material-ui/CircularProgress'
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
    let r = new randomColors()
    const color = r.get()+''
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title={this.props.title} />        
        {this.props.data.labels.length === 0 ? <div style={{textAlign:'center','marginTop':'15%'}}><CircularProgress size={250} thickness={7} color={color}/></div> : <RC2 data={this.props.data} type='doughnut'/>}
      </Card>
    );
  }
}

export default Doughnut;