import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import RC2 from 'react-chartjs2';
import {hexToRGB, randomColors} from '../../utils/ColorHandler'
import CircularProgress from 'material-ui/CircularProgress';
let Orgdata = {
  labels: [],
  datasets: []
  };
// let dataset = {
//         label: 'My First dataset',
//         backgroundColor: 'rgba(255,99,132,0.2)',
//         borderColor: 'rgba(255,99,132,1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//         hoverBorderColor: 'rgba(255,99,132,1)',
//         data: [65, 59, 80, 81, 56, 55, 40],
//       }
const style = {
  flex: 1,
  padding: '2em',
}

class Bar extends Component {
  constructor(props) {
      super(props)
      this.state = {
        data : {}
      }
  }
  componentDidMount(){
    // let data = Orgdata
    // console.log(this.props.data)
    // let r = new randomColors()
    // for(let key in this.props.data) {
    //   let chartlabels = []
    //   let chartData = []
    //   let dataset = {
    //     label: '',
    //     backgroundColor: 'rgba(255,99,132,0.2)',
    //     borderColor: 'rgba(255,99,132,1)',
    //     borderWidth: 1,
    //     hoverBackgroundColor: 'rgba(255,99,132,0.4)',
    //     hoverBorderColor: 'rgba(255,99,132,1)',
    //     data: [],
    //   }
    //   for(let key2 in this.props.data[key]){
    //     chartlabels.push(key2)
    //     chartData.push(this.props.data[key][key2])
    //     // console.log(key,key2,this.props.data[key][key2])
    //   }

    //   const barColor = r.get()+''

    //   dataset.label = key
    //   // dataset.backgroundColor = 'rgba('+R+','+G+','+B+',0.2)'
    //   // dataset.borderColor = 'rgba('+R+','+G+','+B+',1)'
    //   // dataset.hoverBackgroundColor = 'rgba('+R+','+G+','+B+',0.4)'
    //   // dataset.hoverBorderColor = 'rgba('+R+','+G+','+B+',1)'
    //   dataset.backgroundColor = hexToRGB(barColor, 1)
    //   dataset.borderColor = hexToRGB(barColor, 1)
    //   dataset.hoverBackgroundColor = hexToRGB(barColor, 0.4)
    //   dataset.hoverBorderColor = hexToRGB(barColor, 1)
    //   dataset.data = chartData
    //   if(data.datasets.length <= Object.keys(this.props.data).length){
    //     data.datasets.push(dataset)
    //     data.labels = chartlabels

    //     // console.log(data.datasets)
    //   }

    //   // console.log(dataset,data)
    // }
    // this.setState({
    //   data: data
    // })
    // data = Orgdata
    // console.log(chartlabels,chartData)
    // data.labels = chartlabels
    // data.datasets[0].data = chartData
    // console.log(this.props.title)
    // console.log(data.datasets[0].data)
  }
  render() {
    console.log(this.props.data)
    let r = new randomColors()
    const color = r.get()+''
    
    return (
      <Card style={{height:'100%'}}>
        <CardTitle style={{padding:'10px'}} title={this.props.title} />        
        {this.props.data.datasets.length === 0 ? <div style={{textAlign:'center','marginTop':'15%'}}><CircularProgress size={250} thickness={7} color={color}/></div> : <RC2 data={this.props.data} type='bar'/>}
      </Card>
    );
  }
}

export default Bar;