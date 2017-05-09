import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import ReviewCalendar from './ReviewCalendar'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'
import FloatingActionButton from 'material-ui/FloatingActionButton'
// ICON
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {muiStyle, muiTheme} from '../myTheme'
// COLOR
import { blueA400, green500, pink500 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
// API call
import axios from 'axios'
import {API_DeleteSchedule} from '../resource'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
class EditModal extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        open: false,
        increaseDay:0,
        loading: false,
        comfirm: false
      }
  }
  dummyAsync = (cb) => {
      this.setState({loading: true}, () => {
        this.asyncTimer = setTimeout(cb, 800);
     })
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({open: false});
  }
  handleSubmit = () => {
    if(!this.state.comfirm){
      this.setState({
        loading: true,
      })
      axios.get(
        API_DeleteSchedule,
        {}
      ).then((result)=>{
        console.log(result.data)
        this.dummyAsync(()=>this.setState({
          loading: false,
          comfirm: true
        }))        
      }).catch((err)=>{
          console.log(err)
      })
    }else{
      console.log('refresh')
      this.setState({open: false, comfirm: false})
      this.props.refresh()
    }
  }
  handleChangeMaxDate = (event, date) => {
    // console.log(date)    
    this.setState({
      endTime: date,
      increaseDay: moment(date).diff(moment(this.props.data.endTime), 'days')
    })
  }
  disableDate = (date) => {    
    return moment(date).isBefore(this.props.data.endTime) || moment(date).isAfter(moment(this.props.data.endTime).add(1, 'month'))
  }
  render() {
    const {t} = this.props
    const actions = [
      <FlatButton
        label={t('common:cancel')}
        primary={true}
        disabled={this.state.comfirm || this.state.loading}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={t('common:submit')}
        secondary={true}
        disabled={this.state.loading || this.state.increaseDay<=0}
        onTouchTap={this.handleSubmit}
      />,
    ]
    const optionsStyle = {
        marginRight: 'auto',
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>        
        <div>
          <FlatButton
            style = {{color:muiStyle.palette.primary1Color}} 
            data-tip data-for='edit'
            label={moment(this.props.data.endedAt).format('YYYY-MM-DD')}
            labelPosition="before"
            icon={<EditorModeEdit />}
            onTouchTap={this.handleOpen} />
          <ReactTooltip id='edit' place="bottom" effect='solid'>
            <span>{t('common:editDate')}</span>
          </ReactTooltip>
          <Dialog
            title={this.props.data.instance.id+'-'+t('common:editDate')}
            actions={actions}
            modal={true}
            open={this.state.open}
          >
          {this.state.comfirm ?
            <div><b>Already Updated !</b></div> :
            <div style={optionsStyle}>
              {this.state.loading ? 
                <div style = {{textAlign:'center'}}><CircularProgress size={80} thickness={5} /></div> :
              <div>
              <Divider />
              <TextField
                disabled={true}
                defaultValue={moment(this.props.data.startedAt).format('YYYY-MM-DD')}
                floatingLabelText={t('common:startDate')}
              />
              <DatePicker
                onChange={this.handleChangeMaxDate}
                autoOk={true}
                floatingLabelText={t('common:endDate')}
                shouldDisableDate={this.disableDate}
                defaultDate={new Date(this.props.data.endedAt)}
              />
              {this.state.increaseDay > 0 && <span>{moment(this.props.data.endedAt).format('YYYY-MM-DD')} <font color={green500}>+ {this.state.increaseDay} {t('common:days')}</font></span>}
              <ReviewCalendar />
              </div>
              }
            </div>
          }
          </Dialog>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default translate('')(EditModal)