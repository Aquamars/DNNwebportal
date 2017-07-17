import React, {Component} from 'react';
import { Card, CardTitle } from 'material-ui/Card';
import { Line, Circle } from 'rc-progress';
import {hexToRGB, randomColors} from '../../utils/ColorHandler'
class LinearProgress extends Component {
	constructor(props) {
		super(props)
		
	    let data = []
	    let value = []
	    let total = 0
	    const r = new randomColors()
	    for(let obj in this.props.data){
	    	// console.log(obj+':'+this.props.data[obj])
	    	let el = {}
	    	el.label = obj
	    	el.value = this.props.data[obj]
	    	el.orgValue = this.props.data[obj]
	    	el.color = r.get()
	    	data.push(el)
	    	total = total + this.props.data[obj]
	    	value.push(0)
	    }
	    data.map((obj)=>(obj.value =  Math.floor((obj.value/total)*100)))

	    this.state = {
	    	data:data,
	    	value: value
	    }
	}
	addPercent(index) {
	  const self = this;
	  let valueAdd = this.state.value
	  valueAdd[index] = valueAdd[index]+1
	  
	  this.setState({
	    value: valueAdd,
	  });

	  setTimeout(function(){ self.changeState(); }, 1.5);
	}
	changeState() {
		this.state.data.map((obj, index)=>{
			if(this.state.value[index] < obj.value){
				this.addPercent(index)
			}else{
				let valueAdd = this.state.value
				valueAdd[index] = obj.value
				this.setState({
				  value: valueAdd,
				});
			}			
		})	  
	}
	componentDidMount(){
		this.changeState()
	}
	render(){
						
		return (
			<Card style={{height:'100%'}}>
        		<CardTitle style={{padding:'10px'}} title={this.props.title} />
        			<div style={{padding:'10px'}} style={{width:'80%',margin:'0 auto'}}>
        				<div>        					
        					{this.state.data.map((obj, index)=>(
        						<div>
        						<h3>{obj.label}:{obj.orgValue}({obj.value}%)</h3>	
        						<Line percent={this.state.value[index]} strokeWidth="4" strokeColor={obj.color} />
        						</div>
        					 ))
        					}
				        </div>
        			</div>
      		</Card>
		)
	}
}
export default LinearProgress

// <Circle
// 					           percent={this.state.percent}
// 					           strokeWidth="6"
// 					           strokeLinecap="square"
// 					           strokeColor={'#3FC7FA'}
// 					        />