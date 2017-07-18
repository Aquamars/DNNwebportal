import {hexToRGB, randomColors} from './ColorHandler'
const Orgdata = {
  labels: [],
  datasets: []
};
const Orgdataset = {
        label: '',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [],
      }
export function toBarData (jsonData){
	let data = {}
	data.datasets = []
    // console.log(jsonData)
    let r = new randomColors()
    for(let key in jsonData) {
      let chartlabels = []
      let chartData = []
      let dataset = {}
      for(let key2 in jsonData[key]){
        chartlabels.push(key2)
        chartData.push(jsonData[key][key2])
        // console.log(key,key2,this.props.data[key][key2])
      }
      // console.log(chartData)
      const barColor = r.get()+''

      dataset.label = key
      dataset.backgroundColor = hexToRGB(barColor, 1)
      dataset.borderColor = hexToRGB(barColor, 1)
      dataset.hoverBackgroundColor = hexToRGB(barColor, 0.4)
      dataset.hoverBorderColor = hexToRGB(barColor, 1)
      dataset.data = chartData

      data.datasets.push(dataset)
	    data.labels = chartlabels

    }
    return data
}

export function toPieDoughnutData (jsonData){
	let data = {}
	data.datasets = []
	let chartlabels = []
    let chartData = []
    let colors = []
    let r = new randomColors()
    for(let key in jsonData) { 
    	const barColor = r.get()+''
        chartlabels.push(key)
        chartData.push(jsonData[key])
        colors.push(barColor)        
    }
    data.labels = chartlabels
    data.datasets = []
    data.datasets[0] = {}
    data.datasets[0].data = chartData
    data.datasets[0].backgroundColor = colors
    data.datasets[0].hoverBackgroundColor = colors
    
    return data
}

export function toLineData (jsonData){
  let data = {}
  data.datasets = []
  console.log(jsonData)
  let r = new randomColors()
  let dataset = {}
  let chartData = [] 
  let chartlabels = []
  for(let key in jsonData) {
    chartlabels.push(key)
    chartData.push(jsonData[key])      
  }
      // console.log(chartData)
  const Color = r.get()+''
  const Color2 = r.get()+''
  dataset.label = 'data'
  dataset.fill = false
  dataset.lineTension = 0.1
  dataset.backgroundColor = hexToRGB(Color, 0.4)
  dataset.borderColor = hexToRGB(Color, 1)
  dataset.borderCapStyle = 'butt',
  dataset.borderDash = [],
  dataset.borderDashOffset = 0.0,
  dataset.borderJoinStyle = 'miter',
  dataset.pointBorderColor = hexToRGB(Color, 1)
  dataset.pointBackgroundColor = '#fff',
  dataset.pointBorderWidth = 1,
  dataset.pointHoverRadius = 5,
  dataset.pointHoverBackgroundColor = hexToRGB(Color, 1)
  dataset.pointHoverBorderColor = hexToRGB(Color2, 1)
  dataset.pointHoverBorderWidth = 2
  dataset.pointRadius = 1
  dataset.pointHitRadius = 10
    // data: [65, 59, 80, 81, 56, 55, 40],
    // dataset.label = key
    // dataset.backgroundColor = hexToRGB(barColor, 1)
    // dataset.borderColor = hexToRGB(barColor, 1)
    // dataset.hoverBackgroundColor = hexToRGB(barColor, 0.4)
    // dataset.hoverBorderColor = hexToRGB(barColor, 1)
  dataset.data = chartData

  data.datasets.push(dataset)
  data.labels = chartlabels

    
  console.log(data)
  return data
}
