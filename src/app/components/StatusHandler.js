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
import ReactTooltip from 'react-tooltip'
import { Label } from 'semantic-ui-react'
import 'semantic-ui-css/components/label.min.css'
// ICON
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

class StatusHandler extends Component {
	// static propTypes = {	    
	//     statusId: React.PropTypes.number,
	// }
	constructor(props) {
      super(props)
      this.state = {
      	elapsed: 0,
      	refreshTimes: 0
      }
    }
	setIncetanceStatus = (status) => {
		const {t} = this.props
		let obj;
		// console.log('StatusHandler:'+status)
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
	componentDidMount(){
		if(this.props.statusId == '2')
			this.timer = setInterval(this.tick,50)
	}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	tick = () => {
		this.setState({
			elapsed: new Date() - new Date(this.props.start)
		})
		let elapsed = Math.round(this.state.elapsed / 100)
		let seconds = (elapsed / 10).toFixed(1)
		if(seconds > 10 && this.state.refreshTimes === 0){
			this.props.refresh()
			this.setState({
				elapsed: new Date() - new Date(this.props.start),
				refreshTimes: 1
			})
		}
	}
	render(){
		let elapsed = Math.round(this.state.elapsed / 100)
		let seconds = (elapsed / 10).toFixed(1)
		if(seconds < 0){
			console.log(this.props.start)
			console.log(new Date())
			console.log(new Date(this.props.start))
		}
		const {statusId, t} = this.props
		return(
			<div>
				<div  style={{margin: '0px auto'}}>
					<div style={{display: 'inline-block'}}>
						{this.setIncetanceStatus(statusId)}
					</div>
				{(statusId === '2' && this.state.refreshTimes === 0 && seconds >0) &&
					<div style={{display: 'inline-block', verticalAlign:'middle'}}>
						<div data-tip data-for='status'>
							{seconds}s					
						</div>
						<ReactTooltip id='status' place="bottom" effect='solid'>
				          <span>{t('common:status.count')}</span>
				        </ReactTooltip>
			        </div>
		    	}
		        {(statusId === '2' && this.state.refreshTimes === 1 && seconds > 10) &&
			        <div style={{display: 'inline-block', verticalAlign:'middle'}}>
				       <div data-tip data-for='status'>
				       	{seconds}s <ActionHelpOutline Color={redA700}/>
						</div>				
						<ReactTooltip id='status' place="bottom" effect='solid'>
				          <span>{t('common:status.help')}</span>
				        </ReactTooltip> 
			        </div>
		    	}
		    	</div>				
			</div>
		)
	}
}
export default translate('')(StatusHandler)