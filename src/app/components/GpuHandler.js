import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import 'semantic-ui-css/components/label.min.css'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

class GpuHandler extends Component {
	// static propTypes = {	    
	//     statusId: React.PropTypes.number,
	// }
	constructor(props) {
      super(props)
    }	
	render(){
		const {statusId} = this.props
		return(
			<div><Label color={'brown'}>{this.props.gpu}</Label></div>
		)
	}
}
export default translate('')(GpuHandler)