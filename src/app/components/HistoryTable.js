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
// Import React Table
import ReactTable from "react-table"
import "react-table/react-table.css"
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
// GA
import ReactGA from 'react-ga'

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
	      messages : [],
	      sorted: [],
		  page: 0,
		  pageSize: 5,
		  tableExpanded: {},
		  resized: [],
		  filtered: []
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
    		// GA
		    ReactGA.event({
		      category: 'HistoryTable',
		      action: 'open',
		    })
    	}else{
    		this.setState({
			  data: []
			})
			// GA
		    ReactGA.event({
		      category: 'HistoryTable',
		      action: 'close',
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
			// console.log(api)
			// this.dummyAsync(()=>
			
			if(api.data.historySchedules.length === 0)this.setState({switchPage: false})

			this.setState({
			  // loading: false,
			  data: api.data.historySchedules,
			})
	  		// )
		}catch(err){
			console.log(err)
	  		this.props.errorNotify('ERROR : HistoryTable')
	    }
	}
	componentDidMount(){
		// this.getData()
		this.switchPage()
	}
	renderTable = () => {
		const {t} = this.props
		let orgData = this.state.data
		let tableData = []
		orgData.map((obj)=>{
			obj.startedAt = moment(obj.startedAt).format('YYYY-MM-DD')
			obj.endedAt = moment(obj.endedAt).format('YYYY-MM-DD')
			tableData.push(obj)			
		})
		return(
			<ReactTable
	          data={tableData}
	          columns={[	            
	            {
	              Header: '',
	              columns: [
	              	{
	                  Header: t('common:detail'),
	                  id:'detail',
	                  width:80,
	                  Cell: data => (<div><DetailModal  data = {data.original} iconColor = {grey500} showStatus={false}/></div>)
	                },
	                {
	                  Header: t('common:startDate'),
	                  accessor: 'startedAt'
	                },
	                {
	                  Header: t('common:endDate'),	   
	                  accessor: 'endedAt',	                  
	                },
	                {
	                  Header: t('common:scheduleID'),
	                  accessor: "id"
	                },
	                {
	                  Header: t('common:image'),
	                  id:'image',
	                  accessor: d => d.instance.image.name
	                },
	                {
	                  Header: t('common:gpuType'),
	                  id:'gpuType',
	                  accessor: d => d.instance.machine.gpuType
	                },            
	              ]
	            },	            
	          ]}
	          // pivotBy={["startedAt"]}
	          filterable
	          defaultPageSize={5}
	          className="-striped -highlight"
	          // Controlled props
	          sorted={this.state.sorted}
	          page={this.state.page}
	          pageSize={this.state.pageSize}
	          expanded={this.state.tableExpanded}
	          resized={this.state.resized}
	          filtered={this.state.filtered}
	          // Callbacks
	          onSortedChange={sorted => this.setState({ sorted })}
	          onPageChange={page => this.setState({ page })}
	          onPageSizeChange={(pageSize, page) =>
	            this.setState({ page, pageSize })}
	          onExpandedChange={expanded => this.setState({ tableExpanded: expanded })}
	          onResizedChange={resized => this.setState({ resized })}
	          onFilteredChange={filtered => this.setState({ filtered })}
	        />
        )
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
			  
			  <div style={{margin:'auto', textAlign:'center'}}>{this.state.data.length !== 0 && this.renderTable()}</div>
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