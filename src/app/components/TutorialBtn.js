import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
// ICON
import ActionLanguage from 'material-ui/svg-icons/action/language'
import LockIcon from 'material-ui/svg-icons/action/lock-outline'
import ImagePictureAsPdf from 'material-ui/svg-icons/image/picture-as-pdf'
// GA
import ReactGA from 'react-ga'
// PDF
import {displayPDF} from '../utils/MakeTutorialFile'
// COLOR
import { greenA700, lightBlue500, lightBlue900 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
const toggle = lng => i18n.changeLanguage(lng)

class TutorialBtn extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      open: false,
	    };
	  }
	handleTouchTap = (event) => {
	    // This prevents ghost click.
	    event.preventDefault();

	    this.setState({
	      open: true,
	      anchorEl: event.currentTarget,
	    })
	}
	handleRequestClose = () => {
	    this.setState({
	      open: false,
	    })
	}
	openPDF = (lang) => {
		this.setState({
	      open: false,
	    })
	    displayPDF(localStorage.getItem('itriUser'), lang)
	    //GA
	  	ReactGA.event({
	      category: 'PDF',
	      action: 'open',
	      label: lang
	    })
	}
	render(){
		const {t} = this.props
		return (
		<FlatButton
	        label={<b>{t('common:tutorial')}</b>}
			style = {{color:greenA700}}
			icon={<ImagePictureAsPdf />}
			onTouchTap={()=>this.openPDF(t('common:pdfLang'))}
        />
		)
	}
}
export default translate('')(TutorialBtn)

// <Popover
// 	          open={this.state.open}
// 	          anchorEl={this.state.anchorEl}
// 	          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
// 	          targetOrigin={{horizontal: 'left', vertical: 'top'}}
// 	          onRequestClose={this.handleRequestClose}
// 	        >
// 	          <Menu>
// 	            <MenuItem primaryText="Eng" onTouchTap={()=>this.openPDF('eng')}/>
// 	            <MenuItem primaryText="繁中" onTouchTap={()=>this.openPDF('tc')}/>
// 	          </Menu>
// 	        </Popover>