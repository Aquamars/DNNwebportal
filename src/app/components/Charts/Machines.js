import React, {Component} from 'react';
import { Card, CardTitle, CardText} from 'material-ui/Card'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import {Responsive, WidthProvider, ReactGridLayout } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// i18n
import { translate, Interpolate } from 'react-i18next'
// API call
import axios from 'axios'
import {API_GetAll,API_GetMachine} from '../../resource'

import {toMachineData} from '../../utils/ChartDataHandler'

class Machines extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
	      loading: true,
	      data:{machines:[]},
	    }
	}
	getData = async () => {
	  let current = moment()
	  let addYears = current
	  const a = await axios.get(API_GetMachine,{}).then((res)=>(res)).catch((err)=>(err))
	  const b = await axios.get(
		      API_GetAll,
		      {
		      	params: {
		          start: current.format('YYYY-MM-DD'),
		          end: current.add(1,'years').format('YYYY-MM-DD')
		        }
		      }
		  	).then((res)=>(res)).catch((err)=>(err))
	  console.log(a)
	  console.log(b)
	  const machineToInstance = toMachineData(a.data, b.data)

	  this.setState({		  
		  data: machineToInstance
	  })
	}	
	toMachineData (machines, instances){
		let data = machines
		
		machines.machines.map((obj,index)=>(data.machines[index].instances = []))
		instances.map((obj)=>{
			let instanceObj = {}
			instanceObj.projectCode = obj.projectCode
			instanceObj.startedAt = obj.startedAt
			instanceObj.endedAt = obj.endedAt
			instanceObj.createdAt = obj.createdAt
			instanceObj.updatedAt = obj.updatedAt
			instanceObj.userId = obj.userId
			instanceObj.id = obj.instance.id
			instanceObj.ip = obj.instance.ip
			instanceObj.port = obj.instance.port
			instanceObj.statusId = obj.instance.statusId
			instanceObj.imageId = obj.instance.imageId
			// console.log(instanceObj.id)
			machines.machines.filter((objs, index)=>{
				if(objs.id === obj.instance.machine.id){
					data.machines[index].instances.push(instanceObj)
				}
			})
		})
		// console.log(data)
		return data
			
	}
	componentDidMount(){
		this.getData()
	}
	render(){
		const {data} = this.state
		return (
			<div>
			{ data.machines.length > 0 &&
			<ResponsiveReactGridLayout 
			  className="layout"
			  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
			  cols={{lg: 4, md: 4, sm: 4, xs: 3, xxs: 2}}
			>
			{ 
				data.machines.map((machine, index)=>{
						let machineGrid = {x:0, y: 0, w:4, h:3, isResizable:false}
						machineGrid.x = index % 4
						machineGrid.y = Math.floor(index / 4)
						if(machine.instances.length < 3){
							machineGrid.w = 1
							machineGrid.h = 2
							machineGrid.x = 3
						}else if(machine.instances.length < 5){
							machineGrid.w = 1
							machineGrid.x = 0
						}else if(machine.instances.length < 13){
							machineGrid.w = 3
							machineGrid.x = 0
						}
						return(
							<div key={machine.id} data-grid={machineGrid}>
							<Card style={{height:'100%'}}>
							<CardTitle 
								style={{padding:'10px'}} 
								title={'Machine:'+machine.id}
								data-tip data-for={'machine'+machine.id}
							/>
							<ReactTooltip id={'machine'+machine.id} place="bottom" >
                                <span>id:{machine.id}</span>
                                <br/>
                                <span>name:{machine.name}</span>
                                <br/>
                                <span>Description:{machine.description}</span>
                                <br/>
                                <span>GPU:{machine.gpuType}</span>
                                <br/>
                                <span>Status:{machine.statusId}</span>
                            </ReactTooltip>
							<div>
							<ResponsiveReactGridLayout 
							  className="layout"
							  breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
							  cols={{lg: 10, md: 6, sm: 6, xs: 3, xxs: 2}}
							>
							{
								machine.instances.map((instance, index)=>{
										let instancesGrid = {x:0, y: 0, w:1, h:1, static: true, isResizable:false}
										if(index < 2 ){
											if(machine.instances.length < 3){
												instancesGrid.x = index
											}else{
												instancesGrid.x = 0
												instancesGrid.y = index%2
											}
										}else{
											instancesGrid.y =  index%2
											console.log(index,Math.floor(index / 2),index%2)
											instancesGrid.x =  Math.floor(index / 2)											
										}
										const instanceTitle = 'instance: '+instance.id
										return(
											<div key={instance.id} data-grid={instancesGrid}>
												<Card style={{height:'100%'}} data-tip data-for={'instance: '+instance.id}>										
													<CardTitle style={{padding:'10px'}} title={instanceTitle} />													
												</Card>
												<ReactTooltip id={'instance: '+instance.id} type="info" place="top" >
					                                <span>ip:{instance.ip}</span>
					                                <br/>
					                                <span>port:{instance.port}</span>
					                                <br/>
					                                <span>imageId:{instance.imageId}</span>
					                                <br/>
					                                <span>projectCode:{instance.projectCode}</span>
					                                <br/>
					                                <span>startedAt:{moment(instance.startedAt).format('YYYY-MM-DD')}</span>
					                                <br/>
					                                <span>endedAt:{moment(instance.endedAt).format('YYYY-MM-DD')}</span>
					                                <br/>
					                                <span>userId:{instance.userId}</span>
					                            </ReactTooltip>
											</div>
										)
									}
								)
							}
							</ResponsiveReactGridLayout>
							</div>							
							</Card>							
							</div>
						)
					}
				)
			}
			</ResponsiveReactGridLayout>
			}
			</div>
		)
	}
}
export default translate('')(Machines);

