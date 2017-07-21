import React, {Component} from 'react';
import RC2 from 'react-chartjs2';
import { Card, CardTitle } from 'material-ui/Card'
import {randomColors} from '../../utils/ColorHandler'
import CircularProgress from 'material-ui/CircularProgress';
const Orgdata = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [      
      '#36A2EB',
      '#FF6384',
      '#FFCE56'
    ],
    hoverBackgroundColor: [      
      '#36A2EB',
      '#FF6384',
      '#FFCE56'
    ]
  }]
};

class Pie extends Component {
  render() {
    let r = new randomColors()
    let chartlabels = []
    let chartData = []
    let data = Orgdata
    for(let key in this.props.data) { 
        chartlabels.push(key)
        chartData.push(this.props.data[key])
    }
    console.log(this.props.data)
    data.labels = chartlabels
    data.datasets[0].data = chartData

    const color = r.get()+''
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title={this.props.title} />        
        {this.props.data.labels.length === 0 ? <div style={{textAlign:'center','marginTop':'15%'}}><CircularProgress size={250} thickness={7} color={color}/></div> : <RC2 data={this.props.data} type='pie'/>}
      </Card>
    );
  }
}

export default Pie;