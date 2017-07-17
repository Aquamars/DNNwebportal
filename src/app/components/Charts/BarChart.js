import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import { Card, CardTitle } from 'material-ui/Card';
import {hexToRGB, randomColors} from '../../utils/ColorHandler'
const Orgdata = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: []
  };

class BarChart extends Component{
  render() {
    let data = Orgdata
    // console.log(this.props.data)
    let r = new randomColors()
    for(let key in this.props.data) {
      let chartlabels = []
      let chartData = []
      let dataset = {
        label: '',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [],
      }
      for(let key2 in this.props.data[key]){
        chartlabels.push(key2)
        chartData.push(this.props.data[key][key2])
        // console.log(key,key2,this.props.data[key][key2])
      }

      const barColor = r.get()+''

      dataset.label = key
      // dataset.backgroundColor = 'rgba('+R+','+G+','+B+',0.2)'
      // dataset.borderColor = 'rgba('+R+','+G+','+B+',1)'
      // dataset.hoverBackgroundColor = 'rgba('+R+','+G+','+B+',0.4)'
      // dataset.hoverBorderColor = 'rgba('+R+','+G+','+B+',1)'
      dataset.backgroundColor = hexToRGB(barColor, 1)
      dataset.borderColor = hexToRGB(barColor, 1)
      dataset.hoverBackgroundColor = hexToRGB(barColor, 0.4)
      dataset.hoverBorderColor = hexToRGB(barColor, 1)
      dataset.data = chartData
      if(data.datasets.length < Object.keys(this.props.data).length){
        data.datasets.push(dataset)
        data.labels = chartlabels

        // console.log(data.datasets)
      }

      // console.log(dataset,data)
    }
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title="react-chartjs-2" />
        <div>
        <Bar
          data={data}

        />
        </div>
      </Card>
    );
  }
}
export default BarChart;