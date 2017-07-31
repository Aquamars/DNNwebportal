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
import ReactTooltip from 'react-tooltip'
import Paper from 'material-ui/Paper'
import autoprefixer from 'material-ui/utils/autoprefixer'
import { Card, CardHeader,CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ReviewTable from './ReviewTable'
import HistoryTable from './HistoryTable'
import ChartContainer from './Charts/ChartContainer'
import Footer from './Footer'
import CreatePage from './CreatePage/CreatePage'
import Machines from './Charts/Machines'
//ICON
import ExitIcon from 'material-ui/svg-icons/action/power-settings-new'
import SocialPerson  from 'material-ui/svg-icons/social/person'
import AnalysisIcon from 'material-ui/svg-icons/action/assessment'
import ImageViewComfy from 'material-ui/svg-icons/image/view-comfy'
import DeviceStorage from 'material-ui/svg-icons/device/storage'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionHistory from 'material-ui/svg-icons/action/history'
import MachineIcon from 'material-ui/svg-icons/action/dns'
// COLOR
import { lightBlue500, lightBlue900 } from 'material-ui/styles/colors'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
import DnnLogo from '../image/DNN Web logo_yellow.png'
import EasterEgg from '../image/2013060723055881547495.jpg'
// API call
import axios from 'axios'
import {API_GetInfo} from '../resource'

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
        flex: '0 0 16em',
        marginLeft: 0,
        order: -1,
        transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    },
    sidebarClosed: {
        flex: '0 0 16em',
        marginLeft: '-16em',
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
      open: (localStorage.getItem('itriUser')=== 'itri'),
      content: '',
      notifyOpen: false,
      notifyMsg:'',
      data:''
    }
  }  
  handleToggle = () => {
    if(localStorage.getItem('itriUser')=== 'itri'){
      this.setState({
        open: !this.state.open,
      })
    }   
  }

  handleMenuTap = (value) => {
    // console.log(value)    
    this.setState({
      content: value
    })
  }
  handleTouchTap = () => {
    this.setState({
      open: true,
    })
  }
  handleNotify = (msg) => {
    this.setState({
      notifyOpen: true,
      notifyMsg: msg
    })
    // setTimeout(console.log('handleNotify'), 5400)
  }
  closeNotify = () => {
    console.log('closeNotify')
    this.setState({
      notifyOpen: false,      
    })
  }
  getData = () => {
    axios.get(
        API_GetInfo,
        {
          headers: {'X-Access-Token': this.props.token, 'Accept': 'application/json'},
          params: { mode: 'booked' }
        }
      )
      .then((result)=>{
        console.log(result.data.schedules)
        this.dummyAsync(()=>
          this.setState({
            data: result.data.schedules
          })
        )
      }).catch((err)=>{
        console.log(err) 
      })
  }
  selectItem = (value) =>{
      switch(value){
        case 0:
          return (
                  <div>
                    <ReviewTable token = {this.props.token} notify = {this.handleNotify} />
                    <HistoryTable token = {this.props.token} notify = {this.handleNotify}/>
                  </div>
                 )
          break
        case 1:
          return (<ReviewTable token = {this.props.token} notify = {this.handleNotify} />)
          break
        case 2:
          return (<HistoryTable token = {this.props.token} notify = {this.handleNotify}/>)
          break
        case 3:
          return (
                    <CreatePage 
                      switchReview={()=> this.handleMenuTap(1)}
                      refresh = {this.getData}
                      currentInstanceNum={this.state.data.length}
                      notify = {this.handleNotify}
                      token={this.props.token}
                    />
                  )
          break
        case 4:
          return (<Card><CardText></CardText></Card>)
          break
        case 5:
          return (<ChartContainer />)
          break
        case 6:
          return (<div><Machines /></div>)
          break
        default:
          return (
                  <div>
                    <ReviewTable token = {this.props.token} notify = {this.handleNotify} />
                    <HistoryTable token = {this.props.token} notify = {this.handleNotify}/>
                  </div>
                 )
      }
  }
  render(){ 
      const {t} = this.props 	    
  		return(
	   		<MuiThemeProvider muiTheme={muiTheme}>		   		
	            <div style={prefixedStyles.wrapper}>
                    <div style={prefixedStyles.main}>
                        <AppBar 
                          title={<span><img style={{height:32, width:64, verticalAlign:'middle'}} src={DnnLogo}/><b> DNN Web portal</b></span>}
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
                              {this.selectItem(this.state.content)}
                              {false &&
                                <div>
                                  <ReviewTable token = {this.props.token} notify = {this.handleNotify} />
                                  <HistoryTable token = {this.props.token} notify = {this.handleNotify}/>
                                </div>
                              }
                              <Snackbar
                                open = {this.state.notifyOpen}
                                autoHideDuration = {2500}
                                message={this.state.notifyMsg}
                                onRequestClose = {this.closeNotify}
                                bodyStyle={styleSnackbar}
                                action={<FlatButton href={'mailto:eNgiNEer@No.oNe.cARe'} style={{color:'white'}}>Tell us</FlatButton>}
                              />
                            </div>
                            <Paper
                              style={this.state.open ? MenuStyles.sidebarOpen : MenuStyles.sidebarClosed}                      
                            >
                              <MenuItem
                               primaryText={'Dashboard'}
                               onTouchTap={() => this.handleMenuTap(0)}
                               />
                              <MenuItem
                               leftIcon={<ImageViewComfy />}
                               primaryText={t('common:menu.info')}
                               onTouchTap={() => this.handleMenuTap(1)}
                              />
                              <MenuItem
                               leftIcon={<ActionHistory />}
                               primaryText={t('common:menu.history')}
                               onTouchTap={() => this.handleMenuTap(2)}
                              />
                              <MenuItem
                               leftIcon={<ContentAdd />}
                               primaryText={t('common:menu.create')}
                               onTouchTap={() => this.handleMenuTap(3)}
                              />
                              <MenuItem
                               leftIcon={<DeviceStorage />}
                               primaryText={t('common:menu.storage')}
                               href='http://140.96.29.153/ABC/index.php' 
                               target="_blank"
                               data-tip data-for='storage'
                              />
                              <ReactTooltip id='storage' place="bottom" effect='solid'>
                                <span>{t('common:storage')}</span>
                              </ReactTooltip>
                            { 
                              localStorage.getItem('itriUser') === 'itri' &&
                              <div>
                              <MenuItem
                               leftIcon={<AnalysisIcon />}
                               primaryText={t('common:menu.charts')}
                               onTouchTap={() => this.handleMenuTap(5)}
                              />
                              <MenuItem
                               leftIcon={<MachineIcon />}
                               primaryText={t('common:menu.machine')}
                               onTouchTap={() => this.handleMenuTap(6)}
                              />
                              </div>
                            }
                              <MenuItem
                               leftIcon={<ExitIcon />}
                               primaryText={'SignOut'}
                               onTouchTap={() => this.props.SignOut()}
                              />
                            </Paper>                            
                        </div>
                        <Footer/>
                    </div>
                </div>
	        </MuiThemeProvider>
        )
  }
}
export default translate('')(MainContainer)