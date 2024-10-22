import React, { Component,PureComponent, PropTypes } from 'react'
// i18n
import { translate, Interpolate } from 'react-i18next'

import { Card } from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// Charts
import Bar from './Bar'
import Line from './Line'
import Radar from './Radar'
import Pie from './Pie'
import Bubble from './Bubble'
import Doughnut from './Doughnut'
import PolarArea from './PolarArea'
import BarChart from './BarChart'
import Machines from './Machines'
import PieChart from './PieChart'
import LinearProgress from './LinearProgress'
import {toBarData, toPieDoughnutData, toLineData} from '../../utils/ChartDataHandler'
// resource
import {imageTotalUsed, 
		machineStatusData, 
		instancesStatusData, 
		instancesMonthlyUsed,
		imageMonthlyUsed,
		machineToInstance,
		instanceUsing,
		getschedule} from '../../resource'

import {Responsive, WidthProvider, ReactGridLayout } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {muiStyle, muiTheme} from '../../myTheme'

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    position: 'relative',
  	top: '50%',
  	transform: 'translateY(-50%)',
  },
  ToolbarCard:{
	marginLeft:'10px', 
	marginRight:'10px'
  },
  Toolbar:{
	backgroundColor:'#FFF',
  },
  ToolbarSeparator:{
  	margin:'10px'
  }
};
const layouts = [
	{i:'Bar',x:0, y: 0, w:2, h:4},
	{i:'Line',x:1, y: 2, w:2, h:4},
	{i:'PolarArea',x:2, y: 0, w:1, h:4},
	{i:'Radar',x:1, y: 2, w:1, h:4},
	{i:'Pie',x:2, y: 0, w:1, h:4},
	{i:'Bubble',x:1, y: 1, w:1, h:2},
	{i:'Doughnut',x:0, y: 1, w:1, h:4},
	{i:'BarChart',x:0, y: 0, w:1, h:2},
	{i:'PieChart',x:0, y: 0, w:1, h:4},
	{i:'LinearProgress',x:2, y: 0, w:1, h:2},
];

class ChartContainer extends PureComponent {
	constructor(props) {
	    super(props)
	    const setCharts = [
		   	{
		   		id:1,
		   		type:'Bar',
		   		title:'Images Monthly Used',
		   		data: null,
		   	},
		   	// {
		   	// 	id:2,
		   	// 	type:'Pie',
		   	// 	title:'Instances Status',
		   	// 	data: instancesStatusData,
		   	// },
		   	{
		   		id:3,
		   		type:'Doughnut',
		   		title:'Image Used',
		   		data: {},
		   	},
		   	{
		   		id:4,
		   		type:'Line',
		   		title:'Instances Monthly Used',
		   		data: {},
		   	},
		   	// {
		   	// 	id:5,
		   	// 	type:'Pie',
		   	// 	title:'Machine Status',
		   	// 	data: machineStatusData,
		   	// },
		   	{
		   		id:6,
		   		type:'Pie',
		   		title:'Machine Status',
		   		data: {},
		   	},
		   	{
		   		id:7,
		   		type:'Pie',
		   		title:'Instances Status',
		   		data: {},
		   	},
		   	// {
		   	// 	id:8,
		   	// 	type:'BarChart',
		   	// 	title:'Images Using',
		   	// 	data: instanceUsing,
		   	// },
		   	{
		   		id:8,
		   		type:'Bar',
		   		title:'instance Used',
		   		data: {},
		   	},
		   	// {
		   	// 	id:6,
		   	// 	type:'BarChart',
		   	// 	title:'BarChart',
		   	// 	data: imageMonthlyUsed,
		   	// },
		   	// {
		   	// 	id:7,
		   	// 	type:'PieChart',
		   	// 	title:'PieChart',
		   	// 	data: instancesStatusData,
		   	// },
		   	// {
		   	// 	id:8,
		   	// 	type:'PieChart',
		   	// 	title:'PieChart2',
		   	// 	data: machineStatusData,
		   	// },
		]
	    const {t} = this.props
	    const chartShow = setCharts  
	    // charts.map((obj)=>(chartShow.push(obj.type)))	    
	    this.state = {
	    	// charts:['Pie','Line','Bar','Doughnut'],
	    	charts:setCharts,
	    	chartShow:chartShow,
	    	layouts: layouts,
	    	renderCharts:[],
	    	count:0
	    }
	    console.log(setCharts)
	    console.log(this.state.charts)
	    this.chartDisplay = this.chartDisplay.bind(this);
	    this.getChartData()
	}

	chartDisplay(i, event, isCheck){		
		let array = this.state.chartShow
		if(isCheck){
			const indexchart = this.state.charts.findIndex((obj)=>(obj.id === i))
			console.log(indexchart)
			array.push(this.state.charts[indexchart])			
		}else{
			array = array.filter((obj)=>(obj.id !== i))
		}
		console.log('chartDisplay:'+array)
		this.setState({
			chartShow: array
		})
		// console.log(i, event.target, isCheck,this.state.charts)
	}
	onBreakpointChange(breakpoint, cols){
		// console.log(breakpoint, cols)
	}
	getChartData = async () => {
		let tmp = this.state.charts
		const scheduleData = await getschedule(2017)
		const scheduleData2 = await getschedule(2017)
		const scheduleData3 = await getschedule(2017)
		this.state.charts.map((obj,index)=>{
	    	switch(obj.id){
	    		case 1:
	    			tmp[index].data = imageMonthlyUsed
	    			break
	    		case 2:
	    			break
	    		case 3:
	    			tmp[index].data = imageTotalUsed
	    			break
	    		case 4:
	    			tmp[index].data = scheduleData
	    			break
	    		case 5:
	    			break
	    		case 6:
	    			tmp[index].data = scheduleData2
	    			break
	    		case 7:
	    			tmp[index].data = scheduleData3
	    			break
	    		case 8:
	    			tmp[index].data = instanceUsing
	    			break
	    		case 9:
	    			break
	    	}
	    	// console.log(tmp[index])
	    })
		console.log('getChartData')
		console.log(this.state.charts)
		// return tmp
		// if(!Object.is(this.state.charts, tmp) & this.state.){
		
		this.setState({
			charts:tmp,
			count: 1
		})
		// }
		
		console.log(this.state.charts)
	}
	chartsRender(key){
		const layoutIndex = this.state.layouts.findIndex(obj => obj.i === key.type)
		// console.log(this.state.layouts0[layoutIndex])
		const charts = this.state
		let chart = {}
		switch(key.type){
			case 'Bar':
				chart = <Bar data = {toBarData(key.data)} title = {key.title} />				
				break
			case 'Line':
				chart = <Line data = {toLineData(key.data)} title = {key.title} />				
				break
			case 'PolarArea':
				chart = <PolarArea />				
				break
			case 'Radar':
				chart = <Radar />				
				break
			case 'Pie':
				chart = <Pie data = {toPieDoughnutData(key.data)} title = {key.title} />				
				break			
			case 'Bubble':
				chart = <Bubble />				
				break
			case 'Doughnut':
				chart = <Doughnut data = {toPieDoughnutData(key.data)} title = {key.title} />				
				break
			case 'BarChart':
				chart = <BarChart data = {key.data} title = {key.title} />
				break
			case 'PieChart':
				chart = <PieChart data = {key.data} title = {key.title} />				
				break
			case 'LinearProgress':
				chart = <LinearProgress data = {key.data} title = {key.title}/>				
				break
		}
		return (<div key={key.id} data-grid={this.state.layouts[layoutIndex]}>{chart}</div>)
	}
	createChartsByKey(layouts){
		let renderCharts = []
		Object.keys(layouts).forEach((key) => {
			renderCharts.push(this.chartsRender(key))
		})		
		return renderCharts
	}	
	componentWillMount(){
		console.log('componentWillMount')
		// this.getChartData()
		// const chartData = this.getChartData()
		// this.setState({
		// 	charts: chartData
		// })
	}
	shouldComponentUpdate(nextProps, nextState){
		return true
	}
	componentDidMount(){	
		// this.getChartData()	
		console.log('componentDidMount')
	}
	render(){
		const layouts = {}
		layouts.lg = this.state.layouts
		return (
			<div>
				<div>
					<Card style={styles.ToolbarCard}>
					<Toolbar style={styles.Toolbar}>
					<ToolbarSeparator style={styles.ToolbarSeparator}/>
						{this.state.charts.map((obj,index)=>{
							return (
								<ToolbarGroup>
								<Checkbox
									defaultChecked = {true}
								    label={obj.title}
								    key={obj.id}
								    onCheck={this.chartDisplay.bind(null,obj.id)}
								/>
								</ToolbarGroup>
							)
						})}
					<ToolbarSeparator style={styles.ToolbarSeparator}/>
					</Toolbar>
					</Card>
				</div>				
				<div>
					<ResponsiveReactGridLayout 
					  className="layout"
					  onLayoutChange={this.onLayoutChange}
					  onBreakpointChange={this.onBreakpointChange}
					  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
				      cols={{lg: 3, md: 3, sm: 3, xs: 3, xxs: 2}}>				      
				      {this.state.chartShow.map(x=>this.chartsRender(x))}
				    </ResponsiveReactGridLayout>
			    </div>
		    </div>
		)
	}
}
export default translate('')(ChartContainer)