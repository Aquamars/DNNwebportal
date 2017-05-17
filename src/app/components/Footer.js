import React, { Component, PropTypes } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import LanguageBtn from './LanguageBtn'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer'
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
import EasterEgg from '../image/op.jpg'
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
		return (
			<Paper zDepth={1}>
                <Drawer
                    width={500}
                    openSecondary={true} 
                    open={this.state.open} 
                    containerStyle={{overflow:'hidden'}}
                >
                  <img height='100%'
                    src = {EasterEgg}                    
                   />
                </Drawer>
                <BottomNavigation>
                <BottomNavigationItem
                  icon={<img src={t('common:logoSrc')} />}
                  onTouchTap={this.handleToggle}                              
                />
                <LanguageBtn/>
                </BottomNavigation>
            </Paper>
		)
	}
}

export default translate('')(Footer)