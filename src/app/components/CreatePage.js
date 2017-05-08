import React from 'react'
import { Step, Stepper, StepLabel} from 'material-ui/Stepper'
import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper'
import moment from 'moment'
import HoverDiv from './HoverDiv'
import ReactTooltip from 'react-tooltip'
import CircularProgress from 'material-ui/CircularProgress'
import ReviewCalendar from './ReviewCalendar'
import Hints from './Hints'
// API
import axios from 'axios'
import {API_URL, API_CheckInstance} from '../resource'
//ICON
import MdViewComfortable from 'react-icons/lib/md/view-comfortable'
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import ContentRemoveCircleOutline  from 'material-ui/svg-icons/content/remove-circle-outline'
import ActionCheckCircle  from 'material-ui/svg-icons/action/check-circle'
import DeviceStorage from 'material-ui/svg-icons/device/storage'
// COLOR
import { white, blueA400, blue500, green500, orange500, orangeA700, redA700, greenA700 } from 'material-ui/styles/colors'
import {muiStyle, muiTheme} from '../myTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

const styles = {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: orange500,
  },
  floatingLabelStyle: {
    color: orange500,
  },
  floatingLabelFocusStyle: {
    color: muiStyle.palette.primary1Color,
  },
}

class CreatePage extends React.Component {
  
  constructor(props) {
    super(props)
    console.log('currentInstanceNumthis',this.props.currentInstanceNum)    
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
      submitting: false,
      projectNum: null,
      startDate: new Date(moment().add(1,'day').format('YYYY-MM-DD')),
      endDate: null,
      increaseDay: 0,
      instanceNum: 1,
      queryNumber: 0,
      avalableNumber: [],
      instanceArr: [{ instance: 0, image: 0, dataSet:false, dataSetPath:'', dataSetId:'', dataSetPass:''}],
      imageArr: ['Cowboy Bebop','Trigun','Baccano','Chobits','Lupin the third']
    }
  }

  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    })
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }))
    }
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }))
    }
  }
  handleInstanceNumChange = (event, index, value) => {
    let arr = []
    for(let i = 0; i < value; i++){
      const obj = { instance: i, image: 0, dataSet:false, dataSetPath:'', dataSetId:'', dataSetPass:''}
      arr.push(obj)
    }
    this.setState({
        instanceNum: value,
        instanceArr: arr
    })    
  }
  handleChangeStartDate = (event, date) => {    
    this.setState({
      startDate: date,
      increaseDay: moment(this.state.endDate).diff(moment(date), 'days')
    })
    if(this.state.endDate != null)this.checkInstanceRemain()
  }
  handleChangeEndDate = (event, date) => {    
    this.setState({
      endDate: date,
      increaseDay: moment(date).diff(moment(this.state.startDate), 'days')
    })
    this.checkInstanceRemain()
  }

  checkInstanceRemain = () => {
    const {startDate, endDate} = this.state
    axios.get(
      API_CheckInstance,
      {
        params: {
          endedAt: moment(endDate).format('YYYY-MM-DD'),
          startedAt: moment(startDate).format('YYYY-MM-DD')
        }
      }
    )
    .then((result)=>{ 
      let avalableNum = []
      let number
      if(result.data.avalableNumber <= (3 - this.props.currentInstanceNum)){
        number = result.data.avalableNumber
      }else{
        number = 3 - this.props.currentInstanceNum
      }
      for (let i = 0; i < (number); i++) {
        avalableNum.push(i)
      }
      this.setState({
        queryNumber: result.data.avalableNumber,
        submitting: false,
        avalableNumber: avalableNum
      })
      console.log(
        'queryNumber',result.data.avalableNumber, 
        'avalableNumber',avalableNum.length,
        'currentInstanceNum',this.props.currentInstanceNum)
    }).catch((err)=>{
      console.log(err)
    })
  }
  handleChangeProjectNum = (event, value) => this.setState({projectNum: value})
  disableStartDate = (date) => (moment(date).isBefore(moment()))
  disableEndDate = (date) => (moment(date).isBefore(moment(this.state.startDate).add(1, 'days')) || moment(date).isAfter(moment(this.state.startDate).add(1, 'month')))
  imageSelect = (instance, index, image) => {
    // console.log( instance, index, image)
    const imageArr = this.state.imageArr
    let instanceArr = this.state.instanceArr
    instanceArr[instance].image = image    
    this.setState({
        instanceArr: instanceArr
    }) 
  }
  getStepContent(stepIndex) {
    const {t} = this.props
    const {submitting} = this.state
    switch (stepIndex) {
      case 0:
        return (
          <div>            
            <DatePicker
              autoOk={true}
              floatingLabelText={t('common:startDate')}
              shouldDisableDate={this.disableStartDate}
              onChange={this.handleChangeStartDate}
              value =  {this.state.startDate}    
            />
            <DatePicker
              autoOk={true}
              floatingLabelText={t('common:endDate')}
              onChange = {this.handleChangeEndDate}
              value =  {this.state.endDate}    
              shouldDisableDate={this.disableEndDate}
            />
            <Hints 
              increaseDay = {this.state.increaseDay}
              avalableNumber = {this.state.avalableNumber.length}
              currentInstanceNum = {this.props.currentInstanceNum}
            />            
            <ReviewCalendar />
          </div>
        )
      case 1:
        return (
          <div>
            <TextField
              floatingLabelText = {t('common:project')}
              floatingLabelStyle = {styles.floatingLabelStyle}
              floatingLabelFocusStyle = {styles.floatingLabelFocusStyle}
              onChange = {this.handleChangeProjectNum}              
            />
            <br/>            
            <SelectField
              floatingLabelText={t('common:InstanceNum')}
              value={this.state.instanceNum}
              onChange={this.handleInstanceNumChange}
            >
              {this.state.avalableNumber.map((num) => (
                <MenuItem key={num+1} value={num+1} primaryText={num+1} />
              ))}           
            </SelectField>            
            <br />
            {this.state.instanceArr.map((instance)=>(
              <Card style={{borderRadius: '5px', border:'1px solid #e0e0e0', margin: '2px'}}>
                <CardHeader
                  title={<b>Instance{instance.instance}</b>}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <Divider />
                <CardText expandable={true}>
                <div>                
                  <SelectField
                    key = {instance.instance}
                    floatingLabelText={"Instance"+instance.instance+t('common:instanceImage')}
                    onChange={this.imageSelect.bind(null, instance.instance)}
                    value={instance.image}
                  >
                    {this.state.imageArr.map((image,index)=>(
                      <MenuItem key={index} value={index} primaryText={image} />
                    ))}
                  </SelectField>
                  <FlatButton
                    label={t('common:openStorage')}
                    style = {{color:muiStyle.palette.remind1Color, verticalAlign:'text-bottom'}}
                    icon={<DeviceStorage />}
                    href='http://demo.wftpserver.com' target="_blank"
                    data-tip data-for='storage'
                  />
                  <ReactTooltip id='storage' place="bottom" effect='solid'>
                      <span>{t('common:storage')}</span>
                  </ReactTooltip>
                </div>                
                </CardText>
              </Card>)
            )}
          </div>
        )
      case 2:
        return (
          <div>
            <List>                
              <Divider />
                <ListItem
                  primaryText={<span><b>{t('common:dateRange')} </b>{t('common:interval')} : <font color={green500}>{this.state.increaseDay} {t('common:days')}</font></span>}
                  secondaryText={<p>{moment(this.state.startDate).format('YYYY-MM-DD')} ~ {moment(this.state.endDate).format('YYYY-MM-DD')}</p>}
                />
                <Divider />
                <ListItem
                  primaryText={<b>{t('common:instance')}</b>}
                  secondaryText={<p>{t('common:youCreate')} <b>{this.state.instanceArr.length}</b> {t('common:instance')}.</p>}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={this.state.instanceArr.map((instance, index)=>(        
                    <ListItem
                      key = {index}
                      primaryText={<b>Instance{instance.instance}</b>}
                      secondaryText={<p>Image - <b>{this.state.imageArr[instance.image]}</b></p>}                      
                    />
                  ))}
                />
                <Divider />
                <ListItem
                  primaryText={<b>{t('common:project')}</b>}
                  secondaryText={this.state.projectNum}
                />
              <Divider />
            </List>
          </div>
        )
      default:
        return 'Fly Me To The Moon';
    }
  }
  CreateDone = () => {    
    this.props.refresh()
    this.props.switchReview()
  }

  renderContent() {
    const {finished, stepIndex} = this.state
    const contentStyle = {margin: '0 16px', overflow: 'hidden'}
    const {t} = this.props
    if (finished) {
      return (
        <div style={contentStyle}>
          <List>                
            <Divider />
              <h1>It's DONE !</h1>
            <Divider />
            <RaisedButton 
              label={t('common:backReview')}
              icon={<MdViewComfortable />}
              onTouchTap={this.CreateDone}
            />           
          </List>          
        </div>
      )
    }
    let nextBtnDisable = false
    switch (stepIndex){
      case 0:
        nextBtnDisable = (this.state.increaseDay <= 0 || this.state.increaseDay > 31 || this.state.endDate === null || this.state.avalableNumber.length === 0)
        break
      // case 1:
      //   this.state.instanceArr.map((instance)=>{
      //     nextBtnDisable = (instance.dataSet === true && (instance.dataSetPath.length === 0 || instance.dataSetId.length === 0 || instance.dataSetPass.length === 0))
      //   })
      //   break
      }
    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label={t('common:createStep.back')}
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? t('common:createStep.finish') : t('common:createStep.next')}            
            backgroundColor = {muiStyle.palette.primary1Color}
            labelColor = {white}
            disabled={nextBtnDisable}
            onTouchTap={this.handleNext}
          />          
        </div>
      </div>
    )
  }

  render() {
    const {loading, stepIndex, finished} = this.state
    const {t} = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <Card>
        <CardActions style={{ 
          zIndex: 2, 
          display: 'inline-block', 
          float: 'right',
          right: '10px'
        }}>
          <FlatButton 
            label={t('common:backReview')}
            style = {finished ? {color:'white'} : {color:muiStyle.palette.primary1Color}}
            icon={<MdViewComfortable />}
            disabled = {finished}
            onTouchTap={this.props.switchReview}
          />
        </CardActions>
        <CardTitle title={t('common:create')}/>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>          
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>{t('common:createStep.step1')}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{t('common:createStep.step2')}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{t('common:createStep.step4')}</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>          
        </div>
      </Card>
      </MuiThemeProvider>
    )
  }
}
export default translate('')(CreatePage)