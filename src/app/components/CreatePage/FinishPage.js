import React from 'react'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import moment from 'moment'
import HoverDiv from '../HoverDiv'
import FtpInfoModal from '../FtpInfoModal'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../../utils/i18n'
// COLOR
import { green500 } from 'material-ui/styles/colors'
import { muiStyle } from '../../myTheme'
class FinishPage extends React.Component {
  constructor(props) {
      super(props)
  }
  render(){
    const { t } = this.props
    return (
      <div>
        <h2 style={{textAlign: 'center'}}><b><font color = {muiStyle.palette.primary1Color}>{t('common:createStep.success')}</font></b></h2>
        <List>
          <ListItem
            primaryText={<b>Instance</b>}
            secondaryText={<p><b>ID : {this.props.data.instance.id}</b></p>}
            initiallyOpen={true}
            nestedItems={[
              <ListItem
                primaryText={<span><b>{t('common:ip')}</b></span>}
                secondaryText={t('common:afterRunning')}
               />,
              <ListItem
                primaryText={<span><b>{t('common:port')}</b></span>}
                secondaryText={t('common:afterRunning')}
              />,
              <ListItem
                primaryText={<span><b>{t('common:account')}</b></span>}
                secondaryText={this.props.data.instance.username}
              />,
              <ListItem
                primaryText={<span><b>{t('common:password')}</b></span>}
                secondaryText={this.props.data.instance.password}
              />
            ]}
          />
          <ListItem
            primaryText={<span><b>{t('common:image')} </b></span>}
            secondaryText={<p><b>{this.props.data.instance.image.name}</b></p>}            
          />
          <ListItem                    
            primaryText={<b>{t('common:gpuType')}</b>}
            secondaryText={<p><b>{this.props.data.instance.machine.gpuType}</b></p>}
          />
          <ListItem
            style={{display:'none'}}
            primaryText={<span><b>{t('common:project')} </b></span>}
            secondaryText={<p><b>{this.props.data.projectCode}</b></p>}
          />
          <FtpInfoModal iconColor={'#E65100'}/>
          </List>
      </div>
    )
  }
}
export default translate('')(FinishPage)