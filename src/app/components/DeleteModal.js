import React from 'react'
// redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {errorNotify} from './Notify/actionNotify'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'
import {List, ListItem} from 'material-ui/List'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
// style
import {muiStyle} from '../myTheme'
// ICON
import MdDelete from 'react-icons/lib/md/delete'
// COLOR
import { redA700 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
// API call
import axios from 'axios'
import {API_DeleteSchedule} from '../resource'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class DeleteModal extends React.Component {
  constructor(props) {
      super(props)      
      this.state = {
        open: false,
        loading: false,
        comfirm: false
      }
      console.log(this.props.data)
      console.log(this.props.id)
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({open: false})
  }
  dummyAsync = (cb) => {
      this.setState({loading: true}, () => {
        this.asyncTimer = setTimeout(cb, 1300);
     })
  }
  handleSubmit = () => {
    if(!this.state.comfirm){
      this.setState({
        loading: true,
      })
      const api = API_DeleteSchedule + this.props.id
      fetch(api, 
      { 
        method: 'delete', 
        headers: {
          'x-access-token': this.props.token,
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },       
        // body:data
      }).then((response)=>{
        console.log(response)
        if(response.ok){
          this.dummyAsync(()=>this.setState({
            loading: false,
            comfirm: true
          }))
        }
        return response.json()
      }).then((data)=>{
        console.log('data:'+data)       
      }).catch((err)=>{
        console.log('err:'+err)
        this.props.errorNotify('ERROR : Delete Schedule')
        
        this.setState({open: false, comfirm: false})
        this.props.refresh()
      })
    }else{
      console.log('refresh')
      this.setState({open: false, comfirm: false})
      this.props.refresh()
    }
  }

  render() {
    const {t} = this.props
    const actions = [
      <FlatButton
        label={t('common:cancel')}
        style = {this.state.comfirm ? {color:'white'} : {color:muiStyle.palette.primary1Color}}
        disabled={this.state.comfirm || this.state.loading}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={t('common:submit')}
        secondary={true}
        disabled={this.state.loading}
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
        {this.state.comfirm ? 
          <div><b>{t('common:deletedSuccess')}</b></div> :
          <div>
            {this.state.loading ? <div style = {{textAlign:'center'}}><CircularProgress size={80} color={muiStyle.palette.primary1Color} thickness={5} /></div> :
              <div>
              <font color={redA700}><MdDelete/><b> {t('common:remove.warning')}</b></font>
              <List>                
                  <Divider style={{color:redA700}}/>
                  <ListItem
                    primaryText={<span><b>{t('common:dateRange')}</b></span>}
                    secondaryText={<p>{moment(this.props.data.startedAt).format('YYYY-MM-DD')} ~ {moment(this.props.data.endedAt).format('YYYY-MM-DD')}</p>}
                  />
                  <ListItem
                    primaryText={<b>{t('common:instanceID')}</b>}
                    secondaryText={this.props.data.instance.id}
                  />
                  <ListItem
                    primaryText={<b>{t('common:image')}</b>}
                    secondaryText={this.props.data.instance.image.name}
                  />
                  <ListItem
                    primaryText={<span><b>{t('common:gpuType')} </b></span>}
                    secondaryText={<p><b>{this.props.data.instance.machine.gpuType}</b></p>}
                  />
                  <ListItem
                    style={{display:'none'}}
                    primaryText={<b>{t('common:project')}</b>}
                    secondaryText={this.props.data.projectCode}
                  />
                  <Divider style={{color:redA700}}/>
              </List>
              </div>            
            }
          </div>
        }
        </Dialog>
      </div>
    )
  }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
      errorNotify:errorNotify,
    }, dispatch);
}
export default connect(null,matchDispatchToProps)(translate('')(DeleteModal))