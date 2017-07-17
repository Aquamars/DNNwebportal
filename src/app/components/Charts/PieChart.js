import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import { Card, CardTitle } from 'material-ui/Card'
import {randomColors} from '../../utils/ColorHandler'
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

class PieChart extends Component {
  render() {
    let r = new randomColors()
    let chartlabels = []
    let chartData = []
    let data = Orgdata
    for(let key in this.props.data) { 
        chartlabels.push(key)
        chartData.push(this.props.data[key])
    }
    // console.log(chartlabels,chartData)
    data.labels = chartlabels
    data.datasets[0].data = chartData
    console.log(this.props.title+':'+data.datasets[0].data)
    // let newbackgroundColor = []
    // data.datasets[0].data.map(()=>{
    //   newbackgroundColor.push(r.get())
    // })
    // data.datasets[0].backgroundColor = newbackgroundColor
    // data.datasets[0].hoverBackgroundColor = newbackgroundColor
    
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title={this.props.title} />
        <Pie data={data} />
      </Card>
    );
  }
}

export default PieChart;