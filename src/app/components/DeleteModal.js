import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import {List, ListItem} from 'material-ui/List'
// ICON
import MdDelete from 'react-icons/lib/md/delete'
// COLOR
import { redA700 } from 'material-ui/styles/colors'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class DeleteModal extends React.Component {
  constructor(props) {
      super(props)      
      this.state = {
        open: false,
      }
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleSubmit = () => {
    this.setState({open: false})
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
        primary={true}
        disabled={false}
        onTouchTap={this.handleSubmit}
      />,
    ]

    return (
      <div>
        <FlatButton 
          label=""
          style = {{color:redA700}} 
          fullWidth = {true}
          onTouchTap={this.handleOpen}
          icon={<MdDelete/>} 
        />
        <Dialog
          title='Comfirm remove'
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <font color={redA700}><MdDelete/><b> Are you sure remove this ?</b></font>
          <div>
            <List>                
                <Divider />
                <ListItem
                  primaryText="Date interval"
                  secondaryText={<span>{this.props.data.startTime} ~ {this.props.data.endTime}</span>}
                />
                <ListItem
                  primaryText="Machine"
                  secondaryText={this.props.data.machine}
                />
                <ListItem
                  primaryText="Image"
                  secondaryText={this.props.data.image}
                />
                <ListItem
                  primaryText="Project"
                  secondaryText={this.props.data.project}
                />
                <Divider />
            </List>
          </div>
        </Dialog>
      </div>
    )
  }
}