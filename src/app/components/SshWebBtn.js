import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { indigo900, redA700 } from 'material-ui/styles/colors'
import { SshWebURL, SshWebHost } from '../resource'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
// ICON
import Terminal from 'react-icons/lib/go/terminal'
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
// GA
import ReactGA from 'react-ga'
/**
  ssh web of button
  Example:
  ```
  <SshWebBtn
  	data = {data} 
    {...this.props}
  />
  ```
 */
class SshWebBtn extends Component {
	constructor(props) {
      super(props)
      this.state = {
      	elapsed: 0,
      	// refreshTimes: 0
      }
    }
	static propTypes = {
	  /**
	    Will refresh reviewTable after count 
	  */
	  refresh: React.PropTypes.func.isRequired,
	  /**
        the instance information 
      */
      data: React.PropTypes.object.isRequired,
	}	
	componentDidMount(){
		if(this.props.data !== undefined && this.props.data.statusId == '2')
			this.timer = setInterval(this.tick,50)
	}
	componentWillUnmount(){
		clearInterval(this.timer)
	}
	tick = () => {
		// Adjustment server and client time
		if(this.props.start < new Date(moment(this.props.data.createdAt).utc(8))){
			this.setState({
				elapsed: new Date() - this.props.start
			})
		}else{
			this.setState({
				elapsed: new Date() - new Date(moment(this.props.data.createdAt).utc(8))
			})
		}
		
		let elapsed = Math.round(this.state.elapsed / 100)
		let seconds = (elapsed / 10).toFixed(1)
		console.log(seconds)
		if(seconds > 10 && seconds < 11){
			this.props.refresh()
			this.setState({
				elapsed: new Date() - new Date(moment(this.props.data.createdAt).utc(8)),
				// refreshTimes: 1
			})
		}
	}
	render(){
		const {t} = this.props
		// console.log(this.props.data.statusId)

		console.log('now:'+new Date())
		console.log('new:'+new Date(moment(this.props.data.createdAt).utc(8)))

		let elapsed = Math.round(this.state.elapsed / 100)
		let seconds = (elapsed / 10).toFixed(1)
		return (
			<div>
			{(this.props.data !== undefined) ?
				<div>
				{(this.props.data !== undefined && this.props.data.statusId === 3) && 
						<div>
							<ReactGA.OutboundLink
						        eventLabel="SSHweb"
						        to={SshWebURL + this.props.data.username + '@' + this.props.data.container.podIp + ':' + this.props.data.container.sshPort + '&ssh_once=true' + '&location=' + this.props.data.id} 
						        target="_blank"
						    >
								<FlatButton
									icon={<Terminal size={28} color='black'/>}
									label={<span><font color={indigo900}><b>{'ssh Web'}</b></font></span>}									
								/>
							</ReactGA.OutboundLink>
			    		</div>
				}
				{(this.props.data.statusId === 2 &&  seconds < 10 && seconds >0) &&
					<div style={{display: 'inline-block', verticalAlign:'middle'}}>
						<div data-tip data-for='status'>
							<b>{seconds}s</b>
						</div>
						<ReactTooltip id='status' place="bottom" effect='solid'>
				          <span>{t('common:status.count')}</span>
				        </ReactTooltip>
			        </div>
		    	}
		        {(this.props.data.statusId === 2 && seconds > 10) &&
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
		    	:
		    	<FlatButton
					icon={<Terminal size={28} color='black'/>}
					label={<span><font color={indigo900}><b>{'ssh Web'}</b></font></span>}
					href={SshWebHost} 
					target="_blank"
				/>
		    }
    		</div>
		)
	}
}
export default translate('')(SshWebBtn)