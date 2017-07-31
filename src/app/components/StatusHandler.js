import { 
	yellow900,
	amber900,
	green700,
	greenA700,
	deepOrangeA400,
	deepOrangeA700,
	blue800,
	redA700
} from 'material-ui/styles/colors'
import React, { Component, PropTypes } from 'react'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

class StatusHandler extends Component {

	setIncetanceStatus = (status) => {
		let obj;
		switch(status){
			case 0:
				obj = <font color ={yellow900}><b>{'initial'}</b></font>
				break
			case 1:				
				obj = <font color ={amber900}><b>{'waiting'}</b></font>
				break
			case 2:
				obj = <font color ={green700}><b>{'loading'}</b></font>
				break
			case 3:
				obj = <font color ={greenA700}><b>{'running'}</b></font>
				break
			case 4:
				obj = <font color ={deepOrangeA400}><b>{'deleting'}</b></font>
				break
			case 5:
				obj = <font color ={deepOrangeA700}><b>{'deleted'}</b></font>
				break
			case 6:
				obj = <font color ={blue800}><b>{'canceled'}</b></font>
				break
			case 7:
				obj = <font color ={redA700}><b>{'error'}</b></font>
				break
			default:
				obj = <font color ={'#000'}><b>{'??????'}</b></font>
		}
		return (obj)
	}
	render(){
		return(
			<div>{this.setIncetanceStatus(this.props.statusId)}</div>
		)
	}
}
export default translate('')(StatusHandler)