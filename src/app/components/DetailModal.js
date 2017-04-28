import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ReactTooltip from 'react-tooltip'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import {Tab, Tabs} from 'material-ui'
import moment from 'moment'
import HoverDiv from './HoverDiv'
// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
// ICON
import ActionToc from 'material-ui/svg-icons/action/toc'
// COLOR
import { green500, orange500, greenA700, redA700, orangeA700 } from 'material-ui/styles/colors'
import {muiStyle, muiTheme} from '../myTheme'

class DetailModal extends React.Component {
	constructor(props) {
	    super(props)
	    const increaseDay = moment(this.props.data.endTime).diff(moment(this.props.data.startTime), 'days')
	    const excuteDay = moment(this.props.data.startTime).isBefore(moment()) ? moment().diff(moment(this.props.data.startTime), 'days') : 0
	    const leftDay = moment(this.props.data.endTime).diff(moment(), 'days')
	    this.state = {
	      open: false,
	      increaseDay: increaseDay,
	      excuteDay: excuteDay,
	      leftDay: leftDay
	    }		
	}


	handleOpen = () => {
	  this.setState({open: true})
    }

	handleClose = () => {
	  this.setState({open: false});
	}
	setStatus = (status) => {
		let color;
		switch(status){
			case 'initial':
				color = orangeA700
				break
			case 'running':
				color = greenA700
				break
			case 'stop':
				color = redA700
				break
		}
		return (<span><font color ={color}><b>{status}</b></font></span>)
	}
	render(){
	  const {t} = this.props
	  const optionsStyle = {
	      marginRight: 'auto',
	  }
	  return (
	  	<div>
        <FlatButton
          style = {{color:muiStyle.palette.primary1Color}} 
          data-tip data-for='detail'
          labelPosition="before"
          icon={<ActionToc />}
          onTouchTap={this.handleOpen} />
        <ReactTooltip id='detail' place="bottom" effect='solid'>
          <span>{t('common:detail')}</span>
        </ReactTooltip>
        <Dialog
          title={<p><b>{this.props.data.instance}</b> - {this.setStatus(this.props.data.status)}</p>}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <div style={optionsStyle}>
          <Divider />
          <MuiThemeProvider muiTheme={muiTheme}>
          <Tabs>
	          <Tab  label={<b>{t('common:instance')} & {t('common:image')}</b>} value="a">
		        <div>
			        <List>
		              <ListItem
		                primaryText={this.props.data.dataSet ? <b>Instance <font color={green500}>{t('common:createStep.withDataSet')}</font></b> : <b>Instance <font color={orange500}>{t('common:createStep.withoutDataSet')}</font></b>}
		                secondaryText={<p><b>{this.props.data.instance}</b></p>}
		                initiallyOpen={true}
		                nestedItems={[
		                	<ListItem
				              primaryText={<span><b>{t('common:account')}</b></span>}
				              secondaryText={<HoverDiv account={this.props.data.account} password={this.props.data.password}/>}
				            />
		                ]}
		              />
		              <ListItem
		                primaryText={<span><b>{t('common:image')} </b></span>}
		                secondaryText={<p><b>{this.props.data.image}</b></p>}
		                initiallyOpen={true}
		                nestedItems={this.props.data.dataSet && [
		                    <ListItem
		                       primaryText={<b>{t('common:createStep.dataSetPath')}</b>}
		                       secondaryText={<p><b>{this.props.data.dataSetPath}</b></p>}
		                    />,
		                    <ListItem
		                       primaryText={<b>{t('common:createStep.id')}/{t('common:createStep.password')}</b>}
		                       secondaryText={<HoverDiv account={this.props.data.dataSetId} password={this.props.data.dataSetPass}/>}
		                    />                        
		                ]}
		              />
		              <ListItem
		                primaryText={<span><b>{t('common:project')} </b></span>}
		                secondaryText={<p><b>{this.props.data.project}</b></p>}
		              />
		              <Divider style={{color:green500}}/>
		            </List>
		        </div>
		      </Tab>
		      <Tab label={<b>{t('common:dateRange')}</b>} value="b">
		        <div>
			        <List>
				        <ListItem
			              primaryText={<span><b>{t('common:dateRange')} </b></span>}
			              secondaryText={<p>{this.props.data.startTime} ~ {this.props.data.endTime}</p>}
			              initiallyOpen={true}
			              nestedItems={[
			              	<ListItem
					            primaryText={<span><b>{t('common:interval')} </b></span>}
					            secondaryText={<p><b><font>{this.state.increaseDay} {t('common:days')}</font></b></p>}
					        />,
			              	<ListItem
					            primaryText={<span><b>{t('common:excuteDay')} </b></span>}
					            secondaryText={<p><b><font color={green500}>{this.state.excuteDay} {t('common:days')}</font></b></p>}
					        />,
					        <ListItem
					          primaryText={<span><b>{t('common:leftDay')} </b></span>}
					          secondaryText={<p><b><font color={green500}>{this.state.leftDay} {t('common:days')}</font></b></p>}
					        />
			              ]}
			            />
		            </List>
		        </div>
		       </Tab>
	      </Tabs>  
	      </MuiThemeProvider>        
        </div>
        </Dialog>
        </div>
	  )
	}
}
export default translate('')(DetailModal)