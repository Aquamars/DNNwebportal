import React, { Component, PropTypes } from 'react'
// redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {errorNotify} from './Notify/actionNotify'

import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import HoverDiv from './HoverDiv'
import DetailModal from './DetailModal'
import moment from 'moment'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
// API call
import {getInfo} from '../resource'
// ICON
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionHistory from 'material-ui/svg-icons/action/history'
// sytle
import {muiStyle} from '../myTheme'
// COLOR
import { orangeA700, redA700, greenA700, grey500 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

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
		right: '10px'
	},
	textCenter: {
		textAlign:'center'
	}
}

class HistoryTable extends Component {
	constructor(props) {
	    super(props)
	       
	    this.state = {
	      loading: true,
	      data:[],
	      switchCreatePage: false,
	      singleInfo:{},
	      expanded: false,
	      messages : []
	    }
	}

    SwitchPage = () => {
    	this.setState({
		   switchPage: true
		})    	
    }

    switchPage = () => {
    	this.setState({switchPage: !this.state.switchPage})    	
    	if(!this.state.switchPage){
    		this.getData()
    		setTimeout(()=>this.setState({loading: false,}), 300)
    		
    	}else{
    		this.setState({
			  data: []
			})
    	}    	
    }

	refresh = (event) => {
	    event.preventDefault()

	}	
	// dummyAsync = (cb) => {
	//     this.setState({loading: true}, () => {
	//       this.asyncTimer = setTimeout(cb, 500);
	//    })
	// }
	getData = async () => {
	  	try{
	  		this.setState({
			  loading: true,
			})
			const api = await getInfo(this.props.token, 'history')
			console.log(api)
			// this.dummyAsync(()=>
			
			if(api.data.historySchedules.length === 0)this.setState({switchPage: false})

			this.setState({
			  // loading: false,
			  data: api.data.historySchedules
			})
	  		// )
		}catch(err){
	  		this.props.errorNotify('ERROR : HistoryTable')
	    }
	}
	componentDidMount(){
		// this.getData()
		this.switchPage()
	}


	render(){
		const {t} = this.props
		const {switchPage, loading} = this.state
		// this.state.data.map((data) => {
		// 	const date = moment.utc(data.startedAt).format('YYYY-MM-DD')
		// 	console.log(data.startedAt,date)
		// })
		return (
		  <div>		  	
		    <IconButton 
		      tooltip={t('common:history.history')}
		      onTouchTap={this.switchPage}
		    >
		      <ActionHistory color={grey500}/>
		    </IconButton>
	        {switchPage &&
			<Card>		
			  <CardActions style={styles.actions}>
			  </CardActions>			  
			  <CardTitle title={<font color={grey500}>{t('common:history.title')}</font>}/>
			  <ExpandTransition loading={loading} open={switchPage}> 
			  <Paper>
			  {loading && <div style = {{textAlign:'center'}}><CircularProgress size={80} thickness={5} /></div>}
			  <Table>
    			<TableHeader
    			 displaySelectAll={false}
    			 adjustForCheckbox={false}>
    			  <TableRow>
    			    <TableHeaderColumn style={{width: '8%'}}></TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:startDate')}</TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:endDate')}</TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:scheduleID')}</TableHeaderColumn>			        
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:image')}</TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:account')}</TableHeaderColumn>
			        <TableHeaderColumn style={{display:'none'}}>{t('common:project')}</TableHeaderColumn>			        
			      </TableRow>
			    </TableHeader>
			    <TableBody
			    	style = {{textAlign:'center'}} 
			    	showRowHover={true} 
			    	displayRowCheckbox={false}>
			  	{ this.state.data.map((data, index)=>(
			  	<TableRow key = {index}>
			  	  <TableRowColumn style={{width: '8%'}}><DetailModal data = {data} iconColor = {grey500} showStatus={false}/></TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{moment(data.startedAt).format('YYYY-MM-DD')}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{moment(data.endedAt).format('YYYY-MM-DD')}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{data.id}</TableRowColumn>			      
			      <TableRowColumn style = {styles.textCenter}>{data.instance.image.name}</TableRowColumn>			      
			      <TableRowColumn style = {styles.textCenter}>
			      	<HoverDiv account={data.instance.username} password={data.instance.password}/>
	              </TableRowColumn>
	              <TableRowColumn style={{display:'none'}}>{data.projectCode}</TableRowColumn>			      
			    </TableRow>
			  	))}
			  	</TableBody>
			  </Table>
			  </Paper>
			  </ExpandTransition>
			</Card>
			}
		  </div>
		)
	}
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
    	errorNotify:errorNotify
    }, dispatch);
}
export default connect(null, matchDispatchToProps)(translate('')(HistoryTable))