import React from 'react'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
//ICON
import TiTick from 'react-icons/lib/ti/tick'
import TiTimes from 'react-icons/lib/ti/times'
import TiInfoLarge from 'react-icons/lib/ti/info-large'
// COLOR
import { blueA400, blue500, green500, orange500, orangeA700, redA700, greenA700 } from 'material-ui/styles/colors'
class Hints extends React.Component {
	constructor(props) {
      super(props)
  	}
  	render(){
  		const {t} = this.props
  		return (
  		  <div>  		  	
  		    <br/>
  			{(this.props.increaseDay > 0 && this.props.increaseDay <= 31) && <span><TiTick color={greenA700} /> {t('common:interval')} : <font color={green500}>{this.props.increaseDay} {t('common:days')}</font></span>}
            {(this.props.increaseDay <= 0 || this.props.increaseDay > 31) && <span><TiTimes color={redA700} /> {t('common:interval')} : <font color={redA700}>{this.props.increaseDay} {t('common:days')}</font></span>}
            <br/>
            {this.props.avalableNumber != 0 && <span><TiTick color={greenA700} /> {t('common:createStep.avalableInstance')} : <font color={greenA700}><b>{this.props.avalableNumber}</b></font></span>}
            {this.props.avalableNumber === 0 && <span><TiTimes color={redA700} /> {t('common:createStep.avalableInstance')} : <font color={redA700}><b>{this.props.avalableNumber}</b></font></span>}
            <br/>
            {this.props.currentInstanceNum != 0 && <span><TiInfoLarge color={orangeA700} /> {t('common:createStep.currentInstance')} : <font color={greenA700}><b>{this.props.currentInstanceNum}</b></font></span>}
          </div>
        )
  	}
}
export default translate('')(Hints)