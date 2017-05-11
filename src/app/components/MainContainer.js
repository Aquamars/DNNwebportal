import React, { Component, PropTypes } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MenuItem from 'material-ui/MenuItem'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Snackbar from 'material-ui/Snackbar'
import FontIcon from 'material-ui/FontIcon'
import Paper from 'material-ui/Paper'
import autoprefixer from 'material-ui/utils/autoprefixer'
import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ReviewTable from './ReviewTable'
import HistoryTable from './HistoryTable'
import Footer from './Footer'
//ICON
import ExitIcon from 'material-ui/svg-icons/action/power-settings-new'
import SocialPerson  from 'material-ui/svg-icons/social/person'
// COLOR
import { lightBlue500, lightBlue900 } from 'material-ui/styles/colors'

import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'

const styles = {
	container: {
	    textAlign: 'center',
	    paddingTop: 0,
	},
	wrapper: {
        // Avoid IE bug with Flexbox, see #467
        display: 'flex',
        flexDirection: 'column',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    body: {
        backgroundColor: '#edecec',
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
    },
    bodySmall: {
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: '2em',
    },
    contentSmall: {
        flex: 1,
        paddingTop: '3em',
    },
    loader: {
        position: 'absolute',
        top: 0,
        right: 0,
        margin: 16,
        zIndex: 1200,
    }
}
const MenuStyles = {
    sidebarOpen: {
        flex: '0 0 28em',
        marginLeft: 0,
        order: -1,
        transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
    sidebarClosed: {
        flex: '0 0 28em',
        marginLeft: '-28em',
        order: -1,
        transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
}
const styleSnackbar = {backgroundColor: '#ff405c'}
const prefixedStyles = {}
const muiTheme = getMuiTheme({userAgent: 'all'})

if (!prefixedStyles.main) {
    // do this once because user agent never changes
    const prefix = autoprefixer(muiTheme)
    prefixedStyles.wrapper = prefix(styles.wrapper)
    prefixedStyles.main = prefix(styles.main)
    prefixedStyles.body = prefix(styles.body)
    prefixedStyles.bodySmall = prefix(styles.bodySmall)
    prefixedStyles.content = prefix(styles.content)
    prefixedStyles.contentSmall = prefix(styles.contentSmall)
}

class MainContainer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      open: false,
      data: '',
      notifiyOpen: false,
      notifiyMsg:''
    }
  }  
  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  handleMenuTap = (value) => {
    // console.log(value)    
    this.setState({
      data: value
    })
  }
  handleTouchTap = () => {
    this.setState({
      open: true,
    })
  }
  handleNotify = (msg) => {
    this.setState({
      notifiyOpen: true,
      notifiyMsg: msg
    })
  }
  render(){ 
      const {t} = this.props 	    
  		return(
	   		<MuiThemeProvider muiTheme={muiTheme}>		   		
	            <div style={prefixedStyles.wrapper}>
                    <div style={prefixedStyles.main}>
                        <AppBar 
                          title={<span><img style={{height:32, width:64, verticalAlign:'middle'}} src='./image/DNN Web logo_yellow.png'/><b> DNN Web portal</b></span>}
                          style={{ backgroundColor: lightBlue900 }}
        				          onLeftIconButtonTouchTap={this.handleToggle}
                          iconElementRight={
                            <div>
                              <SocialPerson color='white'/>
                              <span style={{verticalAlign:'super'}}><b><font color='#FDD100'> {this.props.user}</font></b></span>
                              <IconButton 
                                tooltip={t('common:signOut')} 
                                onTouchTap={() => this.props.SignOut()}>                           
                              >
                                <ExitIcon color='white'/>
                              </IconButton>
                            </div>
                          }
        				        />
                        <div className="body" style={prefixedStyles.body}>
                            <div style={prefixedStyles.content}> 
                              <ReviewTable token = {this.props.token} notify = {this.handleNotify} />
                              <br/>
                              <HistoryTable token = {this.props.token} notify = {this.handleNotify}/>
                              <Snackbar
                                open = {this.state.notifiyOpen}
                                autoHideDuration = {2500}
                                message={this.state.notifiyMsg}
                                bodyStyle={styleSnackbar}
                                action={<FlatButton href={'mailto:eNgiNEer@No.oNe.cARe'} labelStyle={{color:'white'}}>Tell us</FlatButton>}
                              />
                            </div>
                            <img
                              src = './image/2013060723055881547495.jpg'                              
                              width="200"
                              style={this.state.open ? MenuStyles.sidebarOpen : MenuStyles.sidebarClosed}                      
                            />                            
                        </div>
                        <Footer/>
                    </div>
                </div>
	        </MuiThemeProvider>
        )
  }
}
export default translate('')(MainContainer)