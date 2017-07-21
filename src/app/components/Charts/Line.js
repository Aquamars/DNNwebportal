import React, {Component} from 'react';
import RC2 from 'react-chartjs2';
import { Card, CardTitle } from 'material-ui/Card'
import {randomColors} from '../../utils/ColorHandler'
import CircularProgress from 'material-ui/CircularProgress';
let data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'data',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    }
  ]
};
const style = {
  flex: 1,
  padding: '2em',
}
class Line extends Component {
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
    // data.datasets[0].label = this.props.title
    let r = new randomColors()
    const color = r.get()+''
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title={this.props.title} />        
        {this.props.data.labels.length === 0 ? <div style={{textAlign:'center','marginTop':'15%'}}><CircularProgress size={250} thickness={7} color={color}/></div> : <RC2 data={this.props.data} type='line'/>}
      </Card>
    );
  }
}

export default Line;