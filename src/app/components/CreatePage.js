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

import moment from 'moment'
//ICON
import MdViewComfortable from 'react-icons/lib/md/view-comfortable'
// COLOR
import { blueA400, blue500, green500,orange500, orangeA700, redA700, greenA700 } from 'material-ui/styles/colors'
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
    color: blue500,
  },
}

class CreatePage extends React.Component {
  
  constructor(props) {
    super(props)      
    this.state = {
      loading: false,
      finished: false,
      stepIndex: 0,
      projectNum: null,
      startDate: moment().add(1,'day').format('YYYY-MM-DD'),
      endDate: null,
      increaseDay: 0,
      machineNum:1,
      machineArr: [{ machine: 0, image: 2}],
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
        finished: stepIndex >= 3,
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
  handleMachineNumChange = (event, index, value) => {
    let arr = []
    for(let i = 0; i < value; i++){
      const obj = { machine: i, image: 1}
      arr.push(obj)
    }
    this.setState({
        machineNum: value,
        machineArr: arr
    })    
  }
  handleChangeStartDate = (event, date) => {    
    this.setState({
      startDate: date,
      increaseDay: moment(this.state.endDate).diff(moment(date), 'days')      
    })
  }
  handleChangeEndDate = (event, date) => {    
    this.setState({
      endDate: date,
      increaseDay: moment(date).diff(moment(this.state.startDate), 'days')
    })
  }

  handleChangeProjectNum = (event, value) => this.setState({projectNum: value})
  disableStartDate = (date) => (moment(date).isBefore(moment()))
  disableEndDate = (date) => (moment(date).isBefore(moment(this.state.startDate).add(1, 'days')) || moment(date).isAfter(moment(this.state.startDate).add(1, 'month')))

  imageSelect = (machine, index, image) => {
    // console.log( machine, index, image)
    const imageArr = this.state.imageArr
    let machineArr = this.state.machineArr
    machineArr[machine].image = image    
    this.setState({
        machineArr: machineArr
    }) 
  }
  
  getStepContent(stepIndex) {
    const {t} = this.props
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
            {this.state.increaseDay > 0 && <span>{t('common:interval')} : <font color={green500}>{this.state.increaseDay} {t('common:days')}</font></span>}
            {this.state.increaseDay < 0 && <span>{t('common:interval')} : <font color={redA700}>{this.state.increaseDay} {t('common:days')}</font></span>}
          </div>
        )
      case 1:
        return (
          <div>
            <SelectField
              floatingLabelText={t('common:InstanceNum')}
              value={this.state.machineNum}
              onChange={this.handleMachineNumChange}
            >
              <MenuItem value={1} primaryText="1" />
              <MenuItem value={2} primaryText="2" />
              <MenuItem value={3} primaryText="3" />
            </SelectField>
            <Divider />
            {this.state.machineArr.map((machine)=>(
              <div>
              <SelectField
                key = {machine.machine}
                floatingLabelText={"Instance"+machine.machine+t('common:machineImage')}
                onChange={this.imageSelect.bind(null, machine.machine)}
                value={machine.image}
              >
                {this.state.imageArr.map((image,index)=>(
                  <MenuItem key={index} value={index} primaryText={image} />
                ))}
              </SelectField>
              </div>)
            )}
          </div>
        )
      case 2:
        return (
          <div>
            <TextField
              floatingLabelText = {t('common:project')}
              floatingLabelStyle = {styles.floatingLabelStyle}
              floatingLabelFocusStyle = {styles.floatingLabelFocusStyle}
              onChange = {this.handleChangeProjectNum}
              
            />
          </div>
        )
      case 3:
        return (
          <div>
            <List>                
              <Divider />
                <ListItem
                  primaryText={<b>{t('common:dateRange')}</b>}
                  secondaryText={<p>{moment(this.state.startDate).format('YYYY-MM-DD')} ~ {moment(this.state.endDate).format('YYYY-MM-DD')}</p>}
                />
                <Divider />
                <ListItem
                  primaryText={<b>{t('common:instance')}</b>}
                  secondaryText={<p>{t('common:youCreate')} <b>{this.state.machineArr.length}</b> {t('common:instance')}.</p>}
                  initiallyOpen={true}
                  primaryTogglesNestedList={true}
                  nestedItems={this.state.machineArr.map((machine)=>(        
                    <ListItem
                      primaryText={<b>{t('common:instance')}{machine.machine}</b>}
                      secondaryText={<p>Image - <b>{this.state.imageArr[machine.image]}</b></p>}
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
              onTouchTap={this.props.switchReview}
            />           
          </List>          
        </div>
      )
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
            label={stepIndex === 3 ? t('common:createStep.finish') : t('common:createStep.next')}
            primary={true}
            disabled={this.state.increaseDay <= 0 || this.state.endDate === null}
            onTouchTap={this.handleNext}
          />          
        </div>
      </div>
    )
  }

  render() {
    const {loading, stepIndex} = this.state
    const {t} = this.props
    return (
      <Card>
        <CardActions style={{ 
          zIndex: 2, 
          display: 'inline-block', 
          float: 'right',
          right: '10px'
        }}>
          <FlatButton 
            label={t('common:backReview')}
            style = {{color:blueA400}}
            icon={<MdViewComfortable />}
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
              <StepLabel>{t('common:createStep.step3')}</StepLabel>
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
    )
  }
}
export default translate('')(CreatePage)