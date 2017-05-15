import React from 'react'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import moment from 'moment'
import HoverDiv from '../HoverDiv'
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
        <h2 style={{textAlign: 'center'}}><b><font color = {muiStyle.palette.primary1Color}> Create instance success ! </font></b></h2>
        <List>
          <ListItem
            primaryText={<b>Instance</b>}
            secondaryText={<p><b>ID : {this.props.data.instance.id}</b></p>}
            initiallyOpen={true}
            nestedItems={[
              <ListItem
                primaryText={<span><b>{t('common:ip')}</b></span>}
                secondaryText={this.props.data.instance.ip}
               />,
              <ListItem
                primaryText={<span><b>{t('common:port')}</b></span>}
                secondaryText={this.props.data.instance.port}
              />,
              <ListItem
                primaryText={<span><b>{t('common:account')}</b></span>}
                secondaryText={<HoverDiv account={this.props.data.instance.username} password={this.props.data.instance.password}/>}
              />
            ]}
          />
          <ListItem
            primaryText={<span><b>{t('common:image')} </b></span>}
            secondaryText={<p><b>{this.props.data.instance.image.name}</b></p>}
            initiallyOpen={true}            
          />
          <ListItem
            primaryText={<span><b>{t('common:project')} </b></span>}
            secondaryText={<p><b>{this.props.data.projectCode}</b></p>}
          />
          <Divider />
          </List>
      </div>
    )
  }
}
export default translate('')(FinishPage)