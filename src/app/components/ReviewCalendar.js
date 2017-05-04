import React from 'react'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import '../style/cal-day.css'
// COLOR
import { white, blueA400, blue500, green500, orange500, orangeA700, redA700, greenA700 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
// API call
import axios from 'axios'
import {API_URL, API_GetCalendar} from '../resource'
class ReviewCalendar extends React.Component {
	constructor(props) {
      super(props)
      this.state = {
        fullDate: [], 
        text: '',
        full: [],
        avil3: [],
        avil2: [],
        avil1: []       
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
    this.getData()
  }
  handleDayClick = (day, { full, avil1, avil2, avil3 }) => {
    let text
    const {t} = this.props
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

    this.setState({ 
      text: text
    })
  }
  render(){
      const {t} = this.props
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
	    }
  		return (
  		<div style={{textAlign:'center'}}>        
        <DayPicker
          enableOutsideDays
          numberOfMonths={2}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          initialMonth={new Date()}
          fromMonth={new Date()}
          toMonth={new Date(2017, 10, 30, 23, 59)}                                    
        />
        <p>
          {this.state.text}
        </p>
      </div>
  		)
  	}
}
export default translate('')(ReviewCalendar)