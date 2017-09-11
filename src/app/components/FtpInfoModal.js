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
import DeviceStorage from 'material-ui/svg-icons/device/storage'
import CopyToClipboard from 'react-copy-to-clipboard'
import {ftpPass} from '../utils/FtpPass'
import {FTPHost, FTPPort} from '../resource'
// GA
import ReactGA from 'react-ga'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
/**
  Show FTP infomation
  Example:
  ```
  <FtpInfoModal iconColor={#000} />
  ```
*/
class FtpInfoModal extends React.Component {
	static propTypes = {
		/**
		  Setting the button color
		*/
        iconColor: React.PropTypes.string,        
    }

	static defaultProps = {
        iconColor: '#000',        
    }
    
	constructor(props){
		super(props)
	    this.state = {
	      open: false,
	    }	 
	}

	handleOpen = () => {
	  this.setState({open: true})
	  //GA
	  ReactGA.event({
	    category: 'FtpInfoModal',
	    action: 'open',		  
	  })
    }

	handleClose = () => {
	  this.setState({open: false});
	  //GA
   	  ReactGA.event({
	    category: 'FtpInfoModal',
	    action: 'close',		  
	  })
	}

	renderContent = () => {
		const {t} = this.props
		const username = localStorage.getItem('itriUser')
		const pass = ftpPass(username)
		return (
			<div>
				<List>
					<CopyToClipboard 
						text={'ftpHost'}
						onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),'ftpHost')}
					>
					<ListItem
			            primaryText={<b>{t('common:ftpHost')}</b>}
			            secondaryText={<p><b>{FTPHost}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={'ftpPort'}
						onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),'ftpPort')}
					>
		            <ListItem
			            primaryText={<b>{t('common:ftpPort')}</b>}
			            secondaryText={<p><b>{FTPPort}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={'FTP'}
						onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),'ftpProtocol')}
					>
		            <ListItem
			            primaryText={<b>{t('common:ftpProtocol')}</b>}
			            secondaryText={<p><b>{'FTP'}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={username}
						onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),'ftpAccount')}
					>
		            <ListItem
			            primaryText={<b>{t('common:account')}</b>}
			            secondaryText={<p><b>{username}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={pass}
						onCopy = {()=> this.props.copyNotify(t('common:alreadyCopy'),'ftpPassword')}
					>
		            <ListItem
			            primaryText={<b>{t('common:password')}</b>}
			            secondaryText={<p><b>{pass}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
				</List>
			</div>
		)
	}
	render(){
		const {t} = this.props
		return (
			<div>
		        <FlatButton
		          style = {{color:this.props.iconColor}}
		          label ={<b>Dataset - FTP</b>}
		          data-tip data-for='storage'		          
		          icon={<DeviceStorage />}
		          onTouchTap={this.handleOpen} />
		        <ReactTooltip id='storage' place="bottom" effect='solid'>
		          <span>{t('common:storage')}</span>
		        </ReactTooltip>
		        <Dialog
		          title={<div><b>{t('common:ftpInfo')}</b></div>}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		          autoScrollBodyContent={true}
		        >		       
		        {this.renderContent()}		        
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
export default connect(null,matchDispatchToProps)(translate('')(FtpInfoModal))