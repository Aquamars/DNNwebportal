import React, { Component, PropTypes } from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
// ICON
import ActionLanguage from 'material-ui/svg-icons/action/language'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
const toggle = lng => i18n.changeLanguage(lng)

class LanguageBtn extends Component {
	state = {
	  valueSingle: '3',	  
	}
	handleChangeSingle = (event, value) => {
	  console.log(value)	
	  switch(value){
	  	case "0":
	  		toggle('en')
	  		break
	  	case "1":
	  		toggle('tw')
	  		break
	  	default:
	  		toggle('en')
	  		break
	  }
	}
	render(){
		const {t} = this.props
		return (
		<IconMenu
          iconButtonElement={<IconButton tooltipPosition={'top-center'} tooltip={t('common:language')}><ActionLanguage /></IconButton>}
          onChange={this.handleChangeSingle}
          value={this.state.valueSingle}
        >
          <MenuItem value="0" primaryText="Eng" />
          <MenuItem value="1" primaryText="繁中" />          
        </IconMenu>
		)
	}
}
export default translate('')(LanguageBtn)