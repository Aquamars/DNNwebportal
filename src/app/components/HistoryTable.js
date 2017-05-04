import React, { Component, PropTypes } from 'react'
import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import CreatePage from './CreatePage'
import HoverDiv from './HoverDiv'
import DetailModal from './DetailModal'
import moment from 'moment'
import ExpandTransition from 'material-ui/internal/ExpandTransition'
import Badge from 'material-ui/Badge'
// API call
import axios from 'axios'
import {API_URL, API_GetInfo} from '../resource'
// ICON
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionHistory from 'material-ui/svg-icons/action/history'
// sytle
import {muiStyle} from '../myTheme'
// COLOR
import { orangeA700, redA700, greenA700 } from 'material-ui/styles/colors'
// Data
import {DATA} from '../resource'
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
    	}else{
    		this.setState({
			  data: []
			})
    	}    	
    }

	refresh = (event) => {
	    event.preventDefault()

	}	

	setStatus = (status) => {
		let obj;
		switch(status){
			case 0:
				obj = <font color ={orangeA700}><b>{'initial'}</b></font>
				break
			case 1:				
				obj = <font color ={greenA700}><b>{'running'}</b></font>
				break
			case 'stop':
				obj = <font color ={redA700}><b>{'stop'}</b></font>
				break
			default:
				obj = <font color ={'#000'}><b>{'??????'}</b></font>
		}
		return (obj)
	}
	dummyAsync = (cb) => {
	    this.setState({loading: true}, () => {
	      this.asyncTimer = setTimeout(cb, 500);
	   })
	}
	getData = () => {		
	    axios.get(
	      API_GetInfo,
	      {
	        headers: {'X-Access-Token': this.props.token},
	        params: { mode: 'history' }
	      }
	    )
	    .then((result)=>{
	      console.log(result.data.historySchedules)
	      this.dummyAsync(()=>
	      	this.setState({
			  loading: false,
			  data: result.data.historySchedules
			})
	      )	      
	      
	    }).catch((err)=>{
	      console.log(err)
	    })
	}
	componentDidMount(){
		// this.getData()
	}

	render(){
		const {t} = this.props
		const {switchPage, loading} = this.state
		return (
		  <div>	        
		    <IconButton 
		      tooltip="History"
		      onTouchTap={this.switchPage}
		    >
		      <ActionHistory />
		    </IconButton>
	        {switchPage &&
			<Card>		
			  <CardActions style={styles.actions}>
			  </CardActions>			  
			  <CardTitle title={'History'}/>
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
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:instance')}</TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:status.status')}</TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:image')}</TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:account')}</TableHeaderColumn>
			        <TableHeaderColumn style = {styles.textCenter}>{t('common:project')}</TableHeaderColumn>			        
			      </TableRow>
			    </TableHeader>
			    <TableBody
			    	style = {{textAlign:'center'}} 
			    	showRowHover={true} 
			    	displayRowCheckbox={false}>
			  	{ this.state.data.map((data, index)=>(
			  	<TableRow key = {index}>
			  	  <TableRowColumn style={{width: '8%'}}><DetailModal data = {data}/></TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{moment(data.startedAt).format('YYYY-MM-DD')}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{moment(data.endedAt).format('YYYY-MM-DD')}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{data.instance.id}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{this.setStatus(data.instance.statusId)}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{data.instance.image.name}</TableRowColumn>			      
			      <TableRowColumn style = {styles.textCenter}>
			      	<HoverDiv account={data.instance.username} password={data.instance.password}/>
	              </TableRowColumn>
	              <TableRowColumn style = {styles.textCenter}>{data.projectCode}</TableRowColumn>			      
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
export default translate('')(HistoryTable)