import React, { Component, PropTypes } from 'react'
import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import { indigo900 } from 'material-ui/styles/colors'
import { SshWebURL } from '../resource'
// ICON
import Terminal from 'react-icons/lib/go/terminal'
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
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
	static propTypes = {
	  /**
        the instance information 
      */
      data: React.PropTypes.object.isRequired,
	}
	render(){
		const {t} = this.props
		console.log('SshWebBtn')
		return (
			<div>
				{this.props.data !== undefined ? 
						<div>
							<FlatButton
								icon={<Terminal size={28} color='black'/>}
								label={<span><font color={indigo900}><b>{'ssh From Web (unstable)'}</b></font></span>}
								href={SshWebURL + this.props.data.username + '@' + this.props.data.container.podIp + ':' + this.props.data.container.sshPort} 
					   			target='_blank'
							/>
			    		</div>
	    			: <div>
	    				<FlatButton
							icon={<Terminal size={28} color='black'/>}
							label={<span><font color={indigo900}><b>{'ssh From Web (unstable)'}</b></font></span>}						
						/>
	    			 </div>
				}
				
    		</div>
		)
	}
}
export default translate('')(SshWebBtn)