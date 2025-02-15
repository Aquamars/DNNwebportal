import React, { Component, PropTypes } from 'react'
// redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {copyNotify} from './Notify/actionNotify'

import FaEye from 'react-icons/lib/fa/eye'
import CopyToClipboard from 'react-copy-to-clipboard'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

class HoverDiv extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
	      hover: false
	    }
	}
	onMouseEnterHandler = () => {
		this.setState({
		   hover: true
		})
	}
	onMouseLeaveHandler = () => {
		this.setState({
		   hover: false
		})
	}
	render(){
		const {t} = this.props
		return(
			<CopyToClipboard 
				text={this.state.hover && this.props.password}
				onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'))}
			>
				<div 
		        onMouseEnter={this.onMouseEnterHandler}
		        onMouseLeave={this.onMouseLeaveHandler} >
		        {this.state.hover ? <span>{this.props.account}<br/>{this.props.password}</span> : <FaEye/>}
		    	</div>
	    	</CopyToClipboard>
		)
	}
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
    	copyNotify:copyNotify
    }, dispatch);
}
export default connect(null,matchDispatchToProps)(translate('')(HoverDiv))