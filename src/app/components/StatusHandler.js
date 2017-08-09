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
import { Label } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
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
			case 1:	
			case '1':
				obj = <Label color={'yellow'}>
				        {t('common:status.waiting')}
				      </Label>
				// obj = <font color ={amber900}><b>{t('common:status.waiting')}</b></font>
				break
			case 2:
			case '2':
				obj = <Label color={'olive'}>
				        {t('common:status.loading')}
				      </Label>
				// obj = <font color ={green700}><b>{t('common:status.loading')}</b></font>
				break
			case 3:
			case '3':
				obj = <Label color={'green'}>
				        {t('common:status.running')}
				      </Label>
				// obj = <font color ={greenA700}><b>{t('common:status.running')}</b></font>
				break
			case 4:
			case '4':
				obj = <Label color={'orange'}>
				        {t('common:status.deleting')}
				      </Label>
				// obj = <font color ={deepOrangeA400}><b>{t('common:status.deleting')}</b></font>
				break
			case 5:
			case '5':
				obj = <Label color={'pink'}>
				        {t('common:status.deleted')}
				      </Label>
				// obj = <font color ={deepOrangeA700}><b>{t('common:status.deleted')}</b></font>
				break
			case 6:
			case '6':
				obj = <Label color={'teal'}>
				        {t('common:status.canceled')}
				      </Label>
				// obj = <font color ={blue800}><b>{t('common:status.canceled')}</b></font>
				break
			case 7:
			case '7':
				obj = <Label color={'red'}>
				        {t('common:status.error')}
				      </Label>
				// obj = <font color ={redA700}><b>{t('common:status.error')}</b></font>
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