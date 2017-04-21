import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import TextField from 'material-ui/TextField'
import moment from 'moment'
// ICON
import MdEdit from 'react-icons/lib/md/edit'
// COLOR
import { blueA400, green500, pink500 } from 'material-ui/styles/colors'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class EditModal extends React.Component {

  constructor(props) {
      super(props)      
      this.state = {
        open: false,
        increaseDay:0  
      }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleChangeMaxDate = (event, date) => {
    console.log(date)    
    this.setState({
      endTime: date,
      increaseDay: moment(date).diff(moment(this.props.data.endTime), 'days')
    })
  }

  disableDate = (date) => {    
    return moment(date).isBefore(this.props.data.endTime) || moment(date).isAfter(moment(this.props.data.endTime).add(1, 'month'))
  }

  countDays = (date) => {
    console.log(moment(date).diff(moment(this.props.data.endTime), 'days'))
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        secondary={true}
        onTouchTap={this.handleClose}
      />,
    ]
    const optionsStyle = {
        maxWidth: 255,
        marginRight: 'auto',
    }
    return (      
      <div>
        <FlatButton
          style = {{color:blueA400}} 
          fullWidth = {true}
          label="" 
          icon={<MdEdit />} 
          onTouchTap={this.handleOpen} />
        <Dialog
          title={this.props.data.machine}
          actions={actions}
          modal={true}
          open={this.state.open}
        >          
        <div style={optionsStyle}>
          <TextField
            disabled={true}
            defaultValue={this.props.data.startTime}
            floatingLabelText="Start Date"
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            autoOk={true}
            floatingLabelText="End Date"
            shouldDisableDate={this.disableDate}
            defaultDate={new Date(this.props.data.endTime)}
          />
          {this.state.increaseDay > 0 && <span>{this.props.data.endTime} <font color={green500}>+ {this.state.increaseDay} days</font></span>}
        </div>
        </Dialog>
      </div>
    )
  }
}