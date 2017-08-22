import React, { Component, PropTypes } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Avatar from 'material-ui/Avatar'
import LanguageBtn from './LanguageBtn'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
import {easterEgg, DnnLogo} from '../image'
import pjson from '../../../package.json'
class Footer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
    }
  }

  handleToggle = () => this.setState({open: !this.state.open})

	render(){
		const {t} = this.props   
    // console.log(window.location.href)    
		return (
			<Paper zDepth={1}>
        <Drawer
          width={300}
          openSecondary={true} 
          open={this.state.open} 
          containerStyle={{overflow:'hidden'}}
        >
          <img width='100%'
            src = {easterEgg}                    
          />
          <div style={{textAlign:'center'}}>
            <Avatar src={DnnLogo} size={100}/>
            <br/>
            {'v '+pjson.version}
            <br/>
            {'© 2017 Industrial Technology Research Institute.'}
          </div>
        </Drawer>
        <BottomNavigation>        
          <BottomNavigationItem
            icon={<img src={window.location.href+t('common:logoSrc')} />}
            onTouchTap={this.handleToggle}
          />
          <LanguageBtn/>          
        </BottomNavigation>
      </Paper>
		)
	}
}

export default translate('')(Footer)