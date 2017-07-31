import React from 'react'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import CalendarHint from './CalendarHint'
import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import '../../style/cal-day.css'
// ICON
import FaSquare from 'react-icons/lib/fa/square'
// COLOR
import { white, blueA400, blue500, green500, orange500, orangeA700, redA700, greenA700 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../../utils/i18n'
// API call
import axios from 'axios'
import {API_GetCalendar} from '../../resource'
class ReviewCalendar extends React.Component {
  static propTypes = {
    defualtLoading: React.PropTypes.bool,    
    startDate: React.PropTypes.string,
    endDate: React.PropTypes.string,
    title: React.PropTypes.object,
    showDetail: React.PropTypes.bool,
  }
  static defaultProps = {
    defualtLoading: true,
    showDetail: false
  }

	constructor(props) {
      super(props)
      const {t} = this.props
      this.state = {
        fullDate: [], 
        text: t('common:calendar.today') + ' ' + moment().format('YYYY-MM-DD'),
        full: [],
        avil3: [],
        avil2: [],
        avil1: [],
        executed: [],
        hints:[]
      }
  }
  getData = () => {
    console.log('ReviewCalendar')
    axios.get(
      API_GetCalendar,
      {}
    )
    .then((result)=>{
      // console.log(result.data.availableCalendar)
      let avil1 = []
      let avil2 = []
      let avil3 = []
      let full = []
      result.data.availableCalendar.map((data)=>{
          switch(data.availableNum){
            case 0:
              full.push(moment(data.date).format('YYYY-MM-DD'))
              break
            case 1:
              avil1.push(moment(data.date).format('YYYY-MM-DD'))
              break
            case 2:
              avil2.push(moment(data.date).format('YYYY-MM-DD'))
              break
            case 3:
              avil3.push(moment(data.date).format('YYYY-MM-DD'))
            default:
              avil3.push(moment(data.date).format('YYYY-MM-DD'))
              break
          }
      })
      this.setState({
        fullDate: result.data.availableCalendar,
        full: full,
        avil3: avil3,
        avil2: avil2,
        avil1: avil1,
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  componentDidMount(){
    if(this.props.defualtLoading){
      this.getData()      
    }else if(this.props.showDetail){
      let avil1 = []
      let executed = []
      const currentDate = moment().format('YYYY-MM-DD')
      // {startDate, endDate} = this.props
      const startDate = this.props.startDate
      const endDate = this.props.endDate
      // let dateStart = moment(this.props.startDate)
      console.log(currentDate,startDate,endDate)
      if(moment(currentDate).isBetween(startDate,endDate)){
        let dateStart = moment(startDate)
        while (moment(currentDate) > dateStart) {
          executed.push(dateStart.format('YYYY-MM-DD'))
          dateStart.add(1,'days')
        }
        let dateStart2= moment(currentDate).add(1,'days')
        while (moment(endDate) >= dateStart2) {
          avil1.push(dateStart2.format('YYYY-MM-DD'))
          dateStart2.add(1,'days')
        }
      }else if(moment(currentDate).isBefore(startDate)){
        let dateStart = moment(startDate)
        while (moment(endDate) >= dateStart) {
          avil1.push(dateStart.format('YYYY-MM-DD'))
          dateStart.add(1,'days')
        }
      }else if(moment(currentDate).isAfter(endDate)){
        let dateStart = moment(startDate)
        while (moment(endDate) >= dateStart) {
          executed.push(dateStart.format('YYYY-MM-DD'))
          dateStart.add(1,'days')
        }
      }else if(moment(currentDate).isSame(startDate)){
        let dateStart = moment(startDate).add(1,'days')
        while (moment(endDate) >= dateStart) {
          avil1.push(dateStart.format('YYYY-MM-DD'))
          dateStart.add(1,'days')
        }
      }
      this.setState({
        avil1: avil1,
        executed: executed
      })
    }else{
      let avil1 = []
      let dateStart = moment(this.props.startDate)
      while (moment(this.props.endDate) >= dateStart) {
        avil1.push(dateStart.format('YYYY-MM-DD'))
        dateStart.add(1,'days')
      }
      this.setState({
        avil1: avil1,
      })
    }
  }
  handleDayClick = (day, { full, avil1, avil2, avil3, executed}) => {
    let text
    const {t, showDetail} = this.props
    if(full){
      text = <span>{moment(day).format('YYYY-MM-DD')}<font color={redA700}> <b>{t('common:calendar.fullyDay')}</b></font></span>
    }else if(avil1){
      text = <span>{moment(day).format('YYYY-MM-DD')}<font color={'#66BB6A'}> <b>1 {t('common:calendar.instanceAvailable')}</b></font></span>
    }else if(avil2){
      text = <span>{moment(day).format('YYYY-MM-DD')}<font color={'#43A047'}> <b>2 {t('common:calendar.instanceAvailable')}</b></font></span>
    }else if(avil3){
      text = <span>{moment(day).format('YYYY-MM-DD')}<font color={'#1B5E20'}> <b>3 {t('common:calendar.instanceAvailable')}</b></font></span>
    }else {
      text = <span>{moment(day).format('YYYY-MM-DD')}<font> <b>{t('common:calendar.noData')}</b></font></span>
    }

    if(showDetail){
      if(executed){
        text = <span>{moment(day).format('YYYY-MM-DD')}<font> <b>{t('common:calendar.executed')}</b></font></span>
      }else if(avil1){
        text = <span>{moment(day).format('YYYY-MM-DD')}<font color={'#66BB6A'}> <b> {t('common:calendar.notyetExecute')}</b></font></span>
      }
      if(moment(moment(day).format('YYYY-MM-DD')).isSame(moment().format('YYYY-MM-DD'))){        
        text = <span><font> <b>{t('common:calendar.today')}</b> {moment(day).format('YYYY-MM-DD')}</font></span>
      }
    }

    this.setState({ 
      text: text
    })
  }
  render(){
      const {t} = this.props
      let hints
      if(this.props.defualtLoading){
        hints = [
          {color:'#d50000', text:t('common:calendar.fullyDay')},
          {color:'#66BB6A', text:'1 '+t('common:calendar.instanceAvailable')},
          {color:'#43A047', text:'2 '+t('common:calendar.instanceAvailable')},
          {color:'#1B5E20', text:'3 '+t('common:calendar.instanceAvailable')},
        ]        
      }else if(this.props.showDetail){
        hints = [
          {color:'#9E9E9E', text:t('common:calendar.executed')},
          {color:'#66BB6A', text:t('common:calendar.notyetExecute')},
        ] 
      }else{
        hints = [
          {color:'#66BB6A', text:t('common:editCalendarTitle')},
        ]
      }
  		const modifiers = {
	      full: (day) => {
          return (this.state.full.indexOf(moment(day).format('YYYY-MM-DD'))>=0)
        },
        avil1: (day) => {
          return (this.state.avil1.indexOf(moment(day).format('YYYY-MM-DD'))>=0)
        },
        avil2: (day) => {
          return (this.state.avil2.indexOf(moment(day).format('YYYY-MM-DD'))>=0)
        },
        avil3: (day) => {
          return (this.state.avil3.indexOf(moment(day).format('YYYY-MM-DD'))>=0)
        },
        executed: (day) => {
          return (this.state.executed.indexOf(moment(day).format('YYYY-MM-DD'))>=0)
        },
	    }
  		return (
  		<div style={{textAlign:'center'}}> 
        {this.props.title}
        <p>
          {(this.props.defualtLoading || this.props.showDetail) && this.state.text}
        </p>
        <DayPicker
          enableOutsideDays
          numberOfMonths={2}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          initialMonth={new Date()}
          fromMonth={!this.props.showDetail && new Date()}
          toMonth={new Date(2077, 12, 30, 23, 59)}                                    
        />
        <CalendarHint hints = {hints}/>
      </div>
  		)
  	}
}
export default translate('')(ReviewCalendar)