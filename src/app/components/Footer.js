import React, { Component, PropTypes } from 'react'

import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import LanguageBtn from './LanguageBtn'
import Paper from 'material-ui/Paper'

import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

class Footer extends Component {
	render(){
		const {t} = this.props 
		return (
			<Paper zDepth={1}>
                <BottomNavigation>
                <BottomNavigationItem
                  icon={<img src={t('common:logoSrc')} />}                              
                />
                <LanguageBtn/>
                </BottomNavigation>
            </Paper>
		)
	}
}

export default translate('')(Footer)