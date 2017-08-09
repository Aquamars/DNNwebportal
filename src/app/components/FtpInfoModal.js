import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import ReactTooltip from 'react-tooltip'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import DeviceStorage from 'material-ui/svg-icons/device/storage'
import CopyToClipboard from 'react-copy-to-clipboard'
import CryptoJS from 'crypto-js'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
class FtpInfoModal extends React.Component {
	static propTypes = {
        iconColor: React.PropTypes.string,        
    }

	static defaultProps = {
        iconColor: '#fff',        
    }
	constructor(props){
		super(props)
	    this.state = {
	      open: false,
	    }	 
	}

	handleOpen = () => {
	  this.setState({open: true})
    }

	handleClose = () => {
	  this.setState({open: false});
	}

	renderContent = () => {
		const {t} = this.props
		const username = localStorage.getItem('itriUser')
		const md5Text = CryptoJS.MD5(username+'ITRIDNN').toString()
		const pass = md5Text.slice(0,6)
		return (
			<div>
				<List>
					<CopyToClipboard 
						text={''}
						onCopy = {()=> this.props.notify(t('common:alreadyCopy'),true)}
					>
					<ListItem
			            primaryText={<b>{t('common:ftpHost')}</b>}
			            secondaryText={<p><b>{'ftpHost'}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={''}
						onCopy = {()=> this.props.notify(t('common:alreadyCopy'),true)}
					>
		            <ListItem
			            primaryText={<b>{t('common:ftpPort')}</b>}
			            secondaryText={<p><b>{'ftpPort'}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={''}
						onCopy = {()=> this.props.notify(t('common:alreadyCopy'),true)}
					>
		            <ListItem
			            primaryText={<b>{t('common:ftpProtocol')}</b>}
			            secondaryText={<p><b>{'ftpProtocol'}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={username}
						onCopy = {()=> this.props.notify(t('common:alreadyCopy'),true)}
					>
		            <ListItem
			            primaryText={<b>{t('common:account')}</b>}
			            secondaryText={<p><b>{username}</b></p>}
			            initiallyOpen={true}
		            />
		            </CopyToClipboard>
		            <CopyToClipboard 
						text={pass}
						onCopy = {()=> this.props.notify(t('common:alreadyCopy'),true)}
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
		          label ={<b>FTP</b>}
		          data-tip data-for='storage'
		          labelPosition="before"
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
export default translate('')(FtpInfoModal)
