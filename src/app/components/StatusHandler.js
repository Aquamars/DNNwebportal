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
	// static propTypes = {	    
	//     statusId: React.PropTypes.number,
	// }
	constructor(props) {
      super(props)
    }
	setIncetanceStatus = (status) => {
		const {t} = this.props
		let obj;
		console.log('StatusHandler:'+status)
		switch(status){
			case 0:
				obj = <font color ={yellow900}><b>{t('common:status.initial')}</b></font>
				break
			case 1:	
			case '1':			
				obj = <font color ={amber900}><b>{t('common:status.waiting')}</b></font>
				break
			case 2:
			case '2':
				obj = <font color ={green700}><b>{t('common:status.loading')}</b></font>
				break
			case 3:
			case '3':
				obj = <font color ={greenA700}><b>{t('common:status.running')}</b></font>
				break
			case 4:
			case '4':
				obj = <font color ={deepOrangeA400}><b>{t('common:status.deleting')}</b></font>
				break
			case 5:
			case '5':
				obj = <font color ={deepOrangeA700}><b>{t('common:status.deleted')}</b></font>
				break
			case 6:
			case '6':
				obj = <font color ={blue800}><b>{t('common:status.canceled')}</b></font>
				break
			case 7:
			case '7':
				obj = <font color ={redA700}><b>{t('common:status.error')}</b></font>
				break
			default:
				obj = <font color ={'#000'}><b>{'??????'}</b></font>
		}
		return (obj)
	}
	render(){
		const {statusId} = this.props
		return(
			<div>{this.setIncetanceStatus(statusId)}</div>
		)
	}
}
export default translate('')(StatusHandler)