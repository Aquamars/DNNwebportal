import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import ReviewCalendar from './ReviewCalendar/ReviewCalendar'
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
import {API_PutExtDate, API_GetExtDate} from '../resource'
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
        comfirm: false,
        latestDate:''
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
    console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
    if(!this.state.comfirm){
      this.setState({
        loading: true,
      })
      this.editDateApi()
    }else{
      console.log('refresh')
      this.setState({open: false, increaseDay:0, loading: false, comfirm: false})
      this.props.refresh()
    }
  }
  editDateApi = () => {
    const api = API_PutExtDate+this.props.id
    console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
    fetch(api, 
        { 
          method: 'put', 
          headers: {
            'x-access-token': this.props.token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body:JSON.stringify({end:moment(this.state.endTime).format('YYYY-MM-DD')})
          // body:data
      }).then((response)=>{
        console.log(response)
        if(response.ok){
          this.dummyAsync(()=>this.setState({
            // loading: false,
            comfirm: true,
          }))
        }
        return response.json()
      })
      .then((data)=>{
        console.log('data:'+data)
        // this.setState({
        //   loading: false, 
        // })        
      }).catch((err)=>{
        console.log('err:'+err)
        this.props.notify('ERROR : Edit Date')
      })
  }
  handleChangeMaxDate = (event, date) => {
    console.log(this.props.data.endedAt,date)    
    this.setState({
      endTime: date,
      increaseDay: moment(date).diff(moment(this.props.data.endedAt), 'days')
    })
  }
  getExtandDate = () => {
    console.log(this.props.id)
    console.log(this.props.token)
    const api = API_GetExtDate+this.props.id+"/extendable"
    axios.get(api,
      {
        headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json'
        }
      }
    ).then((result)=>{
      console.log(result.data.extendableLatestDate)
      this.setState({
        latestDate:moment(result.data.extendableLatestDate).format('YYYY-MM-DD')
      })
      console.log('latestDate', this.state.latestDate)
    }).catch((err)=>{
        console.log(err)
        this.props.notify('ERROR : Extend Date')
    })
  }
  disableDate = (date) => {    
    return moment(date).isBefore(this.props.data.endedAt) || moment(date).isAfter(moment(this.state.latestDate))
  }
  componentDidMount(){
    this.getExtandDate()
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
        label={this.state.comfirm ? 'OK' : t('common:submit')}
        secondary={true}
        disabled={ this.state.increaseDay<=0 || (!this.state.comfirm && this.state.loading)}
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
            <div><b>{t('common:updatedSuccess')}</b></div> :
            <div style={optionsStyle}>
              {this.state.loading ? 
                <div style = {{textAlign:'center'}}><CircularProgress size={80} color={muiStyle.palette.primary1Color} thickness={5} /></div> :
                <div>
                  <Divider />
                  <TextField
                    disabled={true}
                    defaultValue={moment(this.props.data.startedAt).format('YYYY-MM-DD')}
                    floatingLabelText={t('common:startDate')}
                  />
                  <br/>
                  <DatePicker
                    onChange={this.handleChangeMaxDate}
                    autoOk={true}
                    floatingLabelText={t('common:endDate')}
                    shouldDisableDate={this.disableDate}
                    defaultDate={new Date(this.props.data.endedAt)}
                    data-tip data-for='click'
                  />
                  <ReactTooltip id='click' place="right" effect='solid'>
                    <span>{t('common:clickEdit')}</span>
                  </ReactTooltip>
                  <Divider />
                  <br />
                  {this.state.increaseDay > 0 && <span>{moment(this.props.data.endedAt).format('YYYY-MM-DD')} <font color={green500}>+ {this.state.increaseDay} {t('common:days')}</font></span>}
                  <ReviewCalendar 
                    defualtLoading={false}
                    startDate = {moment(this.props.data.endedAt).format('YYYY-MM-DD')}
                    endDate = {moment(this.state.latestDate).format('YYYY-MM-DD')}
                    title = {<b>{t('common:editCalendarTitle')}</b>}
                  />                  
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