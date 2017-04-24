import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import ReactTooltip from 'react-tooltip'
// ICON
import MdDelete from 'react-icons/lib/md/delete'
// COLOR
import { redA700 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class DeleteModal extends React.Component {
  constructor(props) {
      super(props)      
      this.state = {
        open: false,
      }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleSubmit = () => {
    this.setState({open: false})
  }

  render() {
    const {t} = this.props
    const actions = [
      <FlatButton
        label={t('common:cancel')}
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={t('common:submit')}
        secondary={true}
        disabled={false}
        onTouchTap={this.handleSubmit}
      />,
    ]

    return (
      <div>
        <FlatButton 
          label=""
          style = {{color:redA700}} 
          fullWidth = {true}
          data-tip data-for='remove'
          onTouchTap={this.handleOpen}
          icon={<MdDelete/>} 
        />
        <ReactTooltip id='remove' place="bottom" effect='solid'>
          <span>{t('common:remove.remove')}</span>
        </ReactTooltip>
        <Dialog
          title={t('common:remove.comfirmRemove')}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <font color={redA700}><MdDelete/><b> {t('common:remove.warning')}</b></font>
          <div>
            <List>                
                <Divider />
                <ListItem
                  primaryText={t('common:dateRange')}
                  secondaryText={<span>{this.props.data.startTime} ~ {this.props.data.endTime}</span>}
                />
                <ListItem
                  primaryText={t('common:instance')}
                  secondaryText={this.props.data.machine}
                />
                <ListItem
                  primaryText={t('common:image')}
                  secondaryText={this.props.data.image}
                />
                <ListItem
                  primaryText={t('common:project')}
                  secondaryText={this.props.data.project}
                />
                <Divider />
            </List>
          </div>
        </Dialog>
      </div>
    )
  }
}
export default translate('')(DeleteModal)