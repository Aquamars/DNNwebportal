import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
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
                <Divider style={{color:redA700}}/>
                <ListItem
                  primaryText={<span><b>{t('common:dateRange')}</b></span>}
                  secondaryText={<p>{moment(this.props.data.startedAt).format('YYYY-MM-DD')} ~ {moment(this.props.data.endedAt).format('YYYY-MM-DD')}</p>}
                />
                <ListItem
                  primaryText={<b>{t('common:instance')}</b>}
                  secondaryText={this.props.data.instance.id}
                />
                <ListItem
                  primaryText={<b>{t('common:image')}</b>}
                  secondaryText={this.props.data.instance.image.name}
                />
                <ListItem
                  primaryText={<b>{t('common:project')}</b>}
                  secondaryText={this.props.data.projectCode}
                />
                <Divider style={{color:redA700}}/>
            </List>
          </div>
        </Dialog>
      </div>
    )
  }
}
export default translate('')(DeleteModal)