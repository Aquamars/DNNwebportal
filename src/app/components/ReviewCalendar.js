import React from 'react'

import moment from 'moment'

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import '../style/cal-day.css'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
class ReviewCalendar extends React.Component {
	constructor(props) {
      super(props)
  	}

  	render(){
  		const modifiers = {
	      even: day => day.getDate() % 2 === 0,
	      odd: day => day.getDate() % 2 !== 0,
	      first: day => day.getDate() === 1,
	    }
  		return (
  		<div>
          <DayPicker
            enableOutsideDays
            numberOfMonths={2}
            modifiers={modifiers}
            initialMonth={new Date()}
            fromMonth={new Date()}
            toMonth={new Date(9999, 10, 30, 23, 59)}                           
          />
         </div>
  		)
  	}
}
export default translate('')(ReviewCalendar)