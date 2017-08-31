import React from 'react'
// redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {copyNotify} from './Notify/actionNotify'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ReactTooltip from 'react-tooltip'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import {Tab, Tabs} from 'material-ui'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import moment from 'moment'
import CopyToClipboard from 'react-copy-to-clipboard'
import StatusHandler from './StatusHandler'
import GpuHandler from './GpuHandler'
import HoverDiv from './HoverDiv'
import ReviewCalendar from './ReviewCalendar/ReviewCalendar'
import FtpInfoModal from './FtpInfoModal'
// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
// ICON
import ActionToc from 'material-ui/svg-icons/action/toc'
// COLOR
import { green500, orange500, greenA700, redA700, orangeA700, indigo900 } from 'material-ui/styles/colors'
import {muiStyle, muiTheme} from '../myTheme'

const textCenter = { textAlign:'center'}

class DetailModal extends React.Component {
	static propTypes = {
        iconColor: React.PropTypes.string,
        showStatus: React.PropTypes.bool
    }

	static defaultProps = {
        iconColor: muiStyle.palette.primary1Color,
        showStatus: true
    }
	constructor(props) {
	    super(props)
	    const increaseDay = moment(this.props.data.endedAt).diff(moment(this.props.data.startedAt), 'days')
	    const excuteDay = moment(this.props.data.startedAt).isBefore(moment()) ? moment().diff(moment(this.props.data.startedAt), 'days') : 0
	    const leftDay = moment(this.props.data.endedAt).diff(moment(), 'days')
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

	renderTabOne = () => {
		const {t} = this.props
		// console.log(this.props.data)
		const sshCMD = 'ssh ' + this.props.data.instance.username + '@' + this.props.data.instance.ip + ' -p ' + this.props.data.instance.port
		return( 
			<div>				
			    <List>
			    	<FtpInfoModal iconColor={'#FF3D00'}/>
		          	<CopyToClipboard 
		             	text={this.props.data.instance.ip}
		             	onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),true)}
		            >
			         	<ListItem 
			            	primaryText={<span><b>{t('common:ip')}</b></span>}
			            	secondaryText={this.props.data.instance.ip}
			         	/>
			         </CopyToClipboard>
			         <CopyToClipboard 
			         	text={this.props.data.instance.port}
			         	onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),true)}
			         >
			          	<ListItem
			           		primaryText={<span><b>{t('common:port')}</b></span>}
			            	secondaryText={this.props.data.instance.port}
			          	/>
			         </CopyToClipboard>
			         <CopyToClipboard 
			         	text={this.props.data.instance.username}
			         	onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),true)}
			         >
		            	<ListItem
			           		primaryText={<span><b>{t('common:account')}</b></span>}
			           		secondaryText={this.props.data.instance.username}
			         	/>
			         </CopyToClipboard>
			         <CopyToClipboard 
			         	text={this.props.data.instance.password}
			         	onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),true)}
			         >
			         	<ListItem
			           		primaryText={<span><b>{t('common:password')}</b></span>}
			           		secondaryText={this.props.data.instance.password}
			         	/>			         	
			         </CopyToClipboard>
			         <CopyToClipboard 
			         	text={sshCMD}
			         	onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),true)}
			         >
			         	<ListItem
			           		primaryText={<span><font color={indigo900}><b>{t('common:copySshCmd')}</b></font></span>}
			           		secondaryText={sshCMD}			           		
			         	/>			         	
			         </CopyToClipboard>
		          	<ListItem
			            primaryText={<span><b>{t('common:image')} </b></span>}
			            secondaryText={<p><b>{this.props.data.instance.image.name}</b></p>}
			            initiallyOpen={true}
			            nestedItems={(this.props.data.instance.datasetPath!=null) && [
			                <ListItem
			                   primaryText={<b>{t('common:createStep.dataSetPath')}</b>}
			                   secondaryText={<p><b>{this.props.data.instance.datasetPath}</b></p>}
			                />,
			                <ListItem
			                   primaryText={<b>{t('common:createStep.id')}/{t('common:createStep.password')}</b>}
			                   secondaryText={<HoverDiv account={this.props.data.instance.datasetUsername} password={this.props.data.instance.datasetPassword}/>}
			                />                        
		            	]}
		          	/>
		         	 <ListItem
		          		style={{display:'none'}}
		            	primaryText={<span><b>{t('common:project')} </b></span>}
		            	secondaryText={<p><b>{this.props.data.projectCode}</b></p>}
		          	/>
		          <Divider style={{color:green500}}/>
		        </List>
		    </div>
		)
	}

	renderTabTwo = () => {
		const {t} = this.props
		return(
			<div>
		       <List>
		    	    <ListItem
			            primaryText={<span><b>{t('common:dateRange')} </b></span>}
			            secondaryText={<p>{moment(this.props.data.startedAt).format('YYYY-MM-DD')} ~ {moment(this.props.data.endedAt).format('YYYY-MM-DD')}</p>}
			            initiallyOpen={true}			              
		        	/>
		        </List>
		        <Divider />
		        <Table>
				    <TableHeader
				    	displaySelectAll={false}
		    	 		adjustForCheckbox={false}
				    >
			      	<TableRow>
				        <TableHeaderColumn style={textCenter}>{<font color='#000'><b>{t('common:interval')}</b></font>}</TableHeaderColumn>
				        <TableHeaderColumn style={textCenter}>{<font color='#000'><b>{t('common:excuteDay')}</b></font>}</TableHeaderColumn>
				        {this.state.leftDay>0 && <TableHeaderColumn style={textCenter}>{<font color='#000'><b>{t('common:leftDay')} </b></font>}</TableHeaderColumn>}
			      	</TableRow>
			    	</TableHeader>
			    	<TableBody displayRowCheckbox={false}>
				      <TableRow>
				        <TableRowColumn style={textCenter}>{<p><b><font>{this.state.increaseDay} {t('common:days')}</font></b></p>}</TableRowColumn>
				        <TableRowColumn style={textCenter}>{<p><b><font color={green500}>{this.state.excuteDay} {t('common:days')}</font></b></p>}</TableRowColumn>
				        {this.state.leftDay>0 && <TableRowColumn style={textCenter}> <p><b><font color={green500}>{this.state.leftDay} {t('common:days')}</font></b></p></TableRowColumn>}
				      </TableRow>
				    </TableBody>
				</Table>
				<Divider />
		        <ReviewCalendar 
		        	defualtLoading={false}
	                startDate = {moment(this.props.data.startedAt).format('YYYY-MM-DD')}
	                endDate = {moment(this.props.data.endedAt).format('YYYY-MM-DD')}
	                showDetail = {true}
		         />
		    </div>		
		)
	}

	render(){
	  const {t, iconColor, showStatus } = this.props
	  const optionsStyle = {
	      marginRight: 'auto',
	  }
	  
	  // console.log('Detail:')
	  // console.log(this.props.data)
	  return (
	  	<div>
        <FlatButton
          style = {{color:iconColor}} 
          data-tip data-for='detail'
          labelPosition="before"
          icon={<ActionToc />}
          onTouchTap={this.handleOpen} />
        <ReactTooltip id='detail' place="bottom" effect='solid'>
          <span>{t('common:detail')}</span>
        </ReactTooltip>
        <Dialog
          title={
          	<div>
          		<b>{t('common:scheduleID')}-{this.props.data.id}</b>
          		{
          			showStatus && 
          			<div style = {{margin: '0px auto'}}>
	          			<div style = {{display: 'inline-block'}}><span> {<StatusHandler statusId={this.props.data.statusId} />} </span></div>
	          			<div style = {{display: 'inline-block', marginLeft:'1%'}}><span> {<GpuHandler gpu = {this.props.data.instance.machine.gpuType} />} </span></div>
          			</div>
          		}
          	</div>
          }
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
		        {this.renderTabOne()}
		      </Tab>
		      <Tab label={<b>{t('common:dateRange')}</b>} value="b">
		        {this.renderTabTwo()}
		      </Tab>
	      </Tabs>  
	      </MuiThemeProvider>        
        </div>
        </Dialog>
        </div>
	  )
	}
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
    	copyNotify:copyNotify
    }, dispatch);
}
export default connect(null,matchDispatchToProps)(translate('')(DetailModal))