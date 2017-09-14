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
import ActionLabel from 'material-ui/svg-icons/action/label'
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
// GA
import ReactGA from 'react-ga'
// Animation
import 'animate.css/animate.min.css'
import {Animated} from "react-animated-css"
/**
  Edit endDate of the instance
  Example:
  ```
  <EditModal 
    token={this.props.token}
    data = {data}
    refresh={this.getData}
    {...this.props}
  />
  ```
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
  static propTypes = {
    /**
      The user token for call api
    */
    token: React.PropTypes.string.isRequired,
    /**
      Will refresh reviewTable after edit 
    */
    refresh: React.PropTypes.func.isRequired,
    /**
      the instance information 
    */
    data: React.PropTypes.object.isRequired,
  }
  static defaultProps = {
    data:  { 
      id: '2',
      statusId: 1,
      projectCode: null,
      username: 'mochatest',
      password: 'k7xrtjep',
      startedAt: '2018-12-31T16:00:00.000Z',
      endedAt: '2019-01-15T15:59:59.000Z',
      createdAt: '2017-09-12T07:35:30.973Z',
      updatedAt: '2017-09-12T07:35:31.753Z',
      userId: '99999999',
      machine: { 
        id: '3',
        label: 'm3',
        name: 'm3',
        description: null,
        gpuAmount: 1,
        gpuType: 'v100',
        statusId: 1 
      },
      container: {
        id: '2', 
        serviceIp: '5.5.6.6', 
        podIp: '8.7.8.7', 
        sshPort: '9527', 
        ports: [] 
      },
      image:  { 
        id: '30',
        label: '201707v001',
        name: 'tensorflow',
        path: null,
        description: null 
      } 
    },          
  }
  dummyAsync = (cb) => {
      this.setState({loading: true}, () => {
        this.asyncTimer = setTimeout(cb, 800);
     })
  }
  handleOpen = () => {
    this.setState({open: true})
    // GA
    ReactGA.event({
      category: 'EditModal',
      action: 'open',
      label:this.props.data.id
    })
  }
  handleClose = () => {
    this.setState({open: false});
    // GA
    ReactGA.event({
      category: 'EditModal',
      action: 'close',
      label:this.props.data.id
    })
  }
  handleSubmit = () => {
    // console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
    if(!this.state.comfirm){
      this.setState({
        loading: true,
      })
      this.editDateApi()
    }else{
      // console.log('refresh')
      this.setState({open: false, increaseDay:0, loading: false, comfirm: false})
      this.props.refresh()
      // GA
      ReactGA.event({
        category: 'EditModal',
        action: 'edited',
        label:this.props.data.id
      })
    }
  }
  editDateApi = () => {
    const api = API_PutExtDate+this.props.data.id
    // console.log(moment(this.state.endTime).format('YYYY-MM-DD'))
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
        // console.log(response)
        if(response.ok){
          this.dummyAsync(()=>this.setState({
            // loading: false,
            comfirm: true,
          }))
        }
        return response.json()
      })
      .then((data)=>{
        // console.log('data:'+data)
        // this.setState({
        //   loading: false, 
        // })        
      }).catch((err)=>{
        // console.log('err:'+err)
        this.props.errorNotify('ERROR : Edit Date')
      })
  }
  handleChangeMaxDate = (event, date) => {
    console.log(this.props.data.endedAt,date)    
    this.setState({
      endTime: date,
      increaseDay: moment(date).diff(moment(this.props.data.endedAt), 'days')
    })
    // GA
    ReactGA.event({
      category: 'EditModal',
      action: 'Select date',
      label:this.props.data.id
    })
  }
  getExtandDate = () => {
    // console.log(this.props.id)
    // console.log(this.props.token)
    const api = API_GetExtDate+this.props.data.id+"/extendable"
    axios.get(api,
      {
        headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json'
        }
      }
    ).then((result)=>{
      // console.log(result.data.extendableLatestDate)
      this.setState({
        latestDate:moment(result.data.extendableLatestDate).format('YYYY-MM-DD')
      })
      // console.log('latestDate', this.state.latestDate)
    }).catch((err)=>{
        console.log(err)
        this.props.errorNotify('ERROR : Extend Date')
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
            onTouchTap={this.handleOpen} 
          />
          <ReactTooltip id='edit' place="bottom" effect='solid'>
            <span>{t('common:editDate')}</span>
          </ReactTooltip>
          <Dialog
            title={<div><b>{t('common:scheduleID')}-{this.props.data.id} {t('common:editDate')}</b></div>}
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
                  <div style={{margin: '0px auto'}}>
                    <div style={{display: 'inline-block'}}>                      
                        <ActionLabel 
                          color = {'white'}
                        />                      
                    </div>
                    <div style={{display: 'inline-block'}}>
                      <TextField
                        disabled={true}
                        defaultValue={moment(this.props.data.startedAt).format('YYYY-MM-DD')}
                        floatingLabelText={t('common:startDate')}
                      />
                    </div>
                  </div>
                  <br/>
                  <div style={{margin: '0px auto'}}>
                    <div style={{display: 'inline-block'}}>
                      <Animated animationIn="rollIn" isVisible={true}>
                        <ActionLabel 
                          color = {muiStyle.palette.primary1Color}
                        />
                      </Animated>
                    </div>
                    <div style={{display: 'inline-block'}}>
                      <DatePicker
                        onChange={this.handleChangeMaxDate}
                        autoOk={true}
                        floatingLabelText={t('common:endDate')}
                        shouldDisableDate={this.disableDate}
                        defaultDate={new Date(this.props.data.endedAt)}
                        data-tip data-for='click'
                      />
                    </div>
                  </div>
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