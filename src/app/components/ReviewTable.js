import React, { Component, PropTypes } from 'react'
import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import CircularProgress from 'material-ui/CircularProgress'
import Divider from 'material-ui/Divider'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'
import CreatePage from './CreatePage'
import HoverDiv from './HoverDiv'
import DetailModal from './DetailModal'
// API call
import axios from 'axios'
import {API_URL} from '../resource'
// ICON
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh'
import ContentAdd from 'material-ui/svg-icons/content/add'

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

class ReviewTable extends Component {
	constructor(props) {
	    super(props)
	       
	    this.state = {
	      submitting: false ,
	      data:DATA,
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
		return (<font color ={color}><b>{status}</b></font>)
	}

	componentDidMount(){
	}

	render(){
		const {t} = this.props		
		return (
			<div>
			{ !this.state.switchCreatePage ?
			<Card>			
			  <CardActions style={styles.actions}>
				<FlatButton 
		          label={t('common:refresh')}
		          style = {{color:muiStyle.palette.primary1Color}}
		          icon={<NavigationRefresh />}
		          onTouchTap={this.refresh}
		        />
		        <FlatButton 
		          label={t('common:create')}
		          style = {{color:muiStyle.palette.primary1Color}}
		          icon={<ContentAdd />}
		          onTouchTap={this.SwitchCreatePage}
		        />
			  </CardActions>
			  <CardTitle title={'DNN'}/>
			  <Paper>
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
			        <TableHeaderColumn style={{width: '8%'}}></TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody
			    	style = {{textAlign:'center'}} 
			    	showRowHover={true} 
			    	displayRowCheckbox={false}>
			  	{ this.state.data.map((data, index)=>(
			  	<TableRow key = {index}>
			  	  <TableRowColumn style={{width: '8%'}}><DetailModal data = {data}/></TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{data.startTime}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}><EditModal data = {data}/></TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{data.instance}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{this.setStatus(data.status)}</TableRowColumn>
			      <TableRowColumn style = {styles.textCenter}>{data.image}</TableRowColumn>			      
			      <TableRowColumn style = {styles.textCenter}>
			      	<HoverDiv {...data}/>
	              </TableRowColumn>
	              <TableRowColumn style = {styles.textCenter}>{data.project}</TableRowColumn>
			      <TableRowColumn style={{width: '8%'}}><DeleteModal data = {data}/></TableRowColumn>
			    </TableRow>
			  	))}
			  	</TableBody>
			  </Table>
			  </Paper>
			</Card>
			: <CreatePage switchReview={this.switchReview}/>}
			</div>
		)
	}
}
export default translate('')(ReviewTable)