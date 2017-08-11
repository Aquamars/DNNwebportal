import React, { Component, PropTypes } from 'react'
// redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {errorNotify, copyNotify} from './Notify/actionNotify'

import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import ReactTooltip from 'react-tooltip'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import CreatePage from './CreatePage/CreatePage'
import HoverDiv from './HoverDiv'
import DetailModal from './DetailModal'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import moment from 'moment'
import StatusHandler from './StatusHandler'
import CopyToClipboard from 'react-copy-to-clipboard'

// API call
import {getInfo} from '../resource'
// ICON
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import ContentAdd from 'material-ui/svg-icons/content/add'
import DeviceStorage from 'material-ui/svg-icons/device/storage'
import GoDatabase from 'react-icons/lib/go/database'
// style
import {muiStyle} from '../myTheme'
// COLOR
import { orangeA700, redA700, greenA700 } from 'material-ui/styles/colors'
// Data
import {DATA} from '../resource'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

import empty from '../image/think.png'

const styles = {
	root: {
	    margin: '-2px',
    },
    gridList: {
        width: '100%',
        margin: 0,
    },
  	refresh: {
	    display: 'inline-block',
	    position: 'relative',
	},
	actions: { 
		zIndex: 2, 
		display: 'inline-block', 
		float: 'right',
		right: '10px',
		margin: '0px auto'
	},
	textCenter: {
		textAlign:'center'
	}
}

class ReviewTable extends Component {
	constructor(props) {
	    super(props)
	       
	    this.state = {
	      loading: true,
	      data:[],
	      switchCreatePage: false,
	      singleInfo:{},
	    }
	}

    SwitchCreatePage = () => {
    	this.setState({
		   switchCreatePage: true
		})    	
    }

    switchReview = () => this.setState({switchCreatePage: false})

	refresh = (event) => {
	    event.preventDefault()
	    this.getData()
	    // setTimeout(()=>this.setState({loading: false,}), 1000)
	}

	dummyAsync = (cb) => {
		console.log('dummyAsync')
	    this.asyncTimer = setTimeout(cb, 400)
	}
	
	getData = async () => {
		try{
			this.setState({
		        loading: true,
		    })
			const api = await getInfo(this.props.token, 'booked')
		    console.log(api)		    
		    if(api.data.schedules){
		    	this.dummyAsync(()=>{
		    		console.log('api:'+false)
		    	    this.setState({
		    	    	loading: false,
		    		    data: api.data.schedules
		    		})
		    	})
		    }		    
		}catch(err){
			this.props.errorNotify('ERROR : ReviewTable')
			// this.props.notify('ERROR : ReviewTable')
		}	    	    
	}

	componentDidMount(){
		this.getData()		
	}

	render(){
		const {t} = this.props
		const {switchCreatePage, loading} = this.state
		// console.log('ReviewTable')
		// console.log(this.state.data.map((data, index)=>(data.statusId)))
		return (
			<div>
			{ !switchCreatePage ?
			<Card>		
			  <CardActions style={styles.actions}>			  	
					<FlatButton
			          label={t('common:create')}
			          style = {this.state.data.length === 3 ? {color:'grey'} : {color:muiStyle.palette.primary1Color}}
			          icon={<ContentAdd />}
			          disabled={this.state.data.length === 3}
			          onTouchTap={this.SwitchCreatePage}		          		          
			        />
					<FlatButton 
			          label={t('common:refresh')}
			          style = {{color:muiStyle.palette.primary1Color}}
			          icon={<NavigationRefresh />}
			          onTouchTap={this.refresh}
			        />
			  </CardActions>
			  <CardTitle title={t('common:reviewTitle')}/>
			  <ExpandTransition loading={loading} open={true}>
				  <Paper>
				  {loading && <div style = {{textAlign:'center'}}><CircularProgress size={80} thickness={5} /></div>}
				  { this.state.data.length > 0 ?
				  <Table>
	    			<TableHeader    			 
	    			 displaySelectAll={false}
	    			 adjustForCheckbox={false}>
	    			  <TableRow>
	    			    <TableHeaderColumn style={{width: '8%'}}></TableHeaderColumn>
				        <TableHeaderColumn style = {styles.textCenter}><b>{t('common:startDate')}</b></TableHeaderColumn>
				        <TableHeaderColumn style = {styles.textCenter}><b>{t('common:endDate')}</b></TableHeaderColumn>
				        <TableHeaderColumn style = {styles.textCenter}><b>{t('common:scheduleID')}</b></TableHeaderColumn>
				        <TableHeaderColumn style = {styles.textCenter}><b>{t('common:status.status')}</b></TableHeaderColumn>
				        <TableHeaderColumn style = {styles.textCenter}><b>{t('common:gpuType')}</b></TableHeaderColumn>
				        <TableHeaderColumn style = {styles.textCenter}><b>{t('common:image')}</b></TableHeaderColumn>
				        <TableHeaderColumn style = {styles.textCenter}><b>{t('common:password')}</b></TableHeaderColumn>
				        <TableHeaderColumn style={{display:'none'}}><b>{t('common:project')}</b></TableHeaderColumn>			        
				        <TableHeaderColumn style={{width: '8%'}}></TableHeaderColumn>
				      </TableRow>
				    </TableHeader>
				    <TableBody
				    	style = {{textAlign:'center'}} 
				    	showRowHover={true} 
				    	displayRowCheckbox={false}>
				  	{ this.state.data.map((data, index)=>(
				  	<TableRow key = {index}>
				  	  <TableRowColumn style={{width: '8%'}}><DetailModal data = {data} notify = {this.props.notify}/></TableRowColumn>
				      <TableRowColumn style = {styles.textCenter}>{moment(data.startedAt).format('YYYY-MM-DD')}</TableRowColumn>
				      <TableRowColumn style = {styles.textCenter}><EditModal id={data.id} token={this.props.token} data = {data} refresh={this.getData} {...this.props}/></TableRowColumn>
				      <TableRowColumn style = {styles.textCenter}>{data.id}</TableRowColumn>
				      <TableRowColumn style = {styles.textCenter}>{<StatusHandler statusId={data.statusId} />}</TableRowColumn>
				      <TableRowColumn style = {styles.textCenter}>{data.instance.machine.gpuType}</TableRowColumn>			      
				      <TableRowColumn style = {styles.textCenter}>{data.instance.image.name}</TableRowColumn>			      
				      <TableRowColumn style = {styles.textCenter}>
				      	<CopyToClipboard 
							text={data.instance.password}
							onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),true)}
						>
							<div>{data.instance.password}</div>
	    				</CopyToClipboard>
		              </TableRowColumn>
		              <TableRowColumn style={{display:'none'}}>{data.projectCode}</TableRowColumn>
				      <TableRowColumn style={{width: '8%'}}><DeleteModal data = {data} id={data.id} notify = {this.props.notify} refresh={this.getData} token={this.props.token}/></TableRowColumn>
				    </TableRow>
				  	))}
				  	</TableBody>
				  </Table>
				  : <div style={{textAlign:'center'}}>
				  		<img width="15%" src={empty}></img>				  		
				  		<h2>{t('common:instanceEmpty')}</h2><br/>
				  	</div>
				  }
				  </Paper>
			  </ExpandTransition>
			</Card>
			: <CreatePage 
				switchReview={this.switchReview}
				refresh = {this.getData}
				currentInstanceNum={this.state.data.length}
				notify = {this.props.notify}
				token={this.props.token}
			  />}
			</div>
		)
	}
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
    	errorNotify:errorNotify,
    	copyNotify:copyNotify
    }, dispatch);
}

export default connect(null,matchDispatchToProps)(translate('')(ReviewTable))