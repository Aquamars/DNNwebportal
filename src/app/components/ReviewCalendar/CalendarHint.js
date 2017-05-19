import React from 'react'
// ICON
import FaSquare from 'react-icons/lib/fa/square'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../../utils/i18n'

class CalendarHint extends React.Component {
  constructor(props) {
    super(props)
    const {t} = this.props
    this.state = {
    	hintsAry: this.props.hints
    }
    console.log('CalendarHint',this.props.hints)
  }
  render(){ 	
 	const {t} = this.props
 	return (
 		<div style={{ textAlign:'center', margin:'0px auto'}}>
 		  {this.state.hintsAry.map((hint) => (
 		   	<div style={{color:hint.color, display: 'inline-block'}}>
         	<span><FaSquare /><font color={'black'}>:{hint.text}{'\u00A0'}</font></span>
        </div>	  		
 		  ))}
    </div>
 	)
 }
}
export default translate('')(CalendarHint)