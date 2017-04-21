import React, { Component, PropTypes } from 'react'
// import { browserHistory } from 'react-router'

// Form elements
import { Card, CardActions, CardTitle } from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Avatar from 'material-ui/Avatar'
import CircularProgress from 'material-ui/CircularProgress'

import LanguageBtn from './LanguageBtn'

import { cyan500, lightBlue500, pinkA200 } from 'material-ui/styles/colors'
// ICON
import LockIcon from 'material-ui/svg-icons/action/lock-outline'

import axios from 'axios'
import {API_URL} from '../resource'

import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
const toggle = lng => i18n.changeLanguage(lng)
const styles = {
      main: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
      },
      card: {
          minWidth: 300,
      },
      avatar: {
          margin: '1em',
          textAlign: 'center ',
      },
      form: {
          padding: '0 1em 1em 1em',
      },
      input: {
          display: 'flex',
      },
    }
const styleSnackbar = {backgroundColor: '#ff405c'}

class SiginFrom extends Component {
  
  constructor(props) {
    super(props)
    // const { title = '123', description = '00' } = this.props.experiment
    
    this.state = {
      username: 'itri',
      password: 'itri',
      signInError: false,
      submitting: false ,
      data:[],
    }
  }

  handleChange = (event, value) => this.setState({ [event.target.name]: value })

  submit = (event) => {
    event.preventDefault()    
   
    this.setState({
      submitting: true      
    })

    axios.post(
      API_URL+'signin',
      {
        username: this.state.username,
        password: this.state.password
        // username: 'itri',
        // password: 'itri'
      }
    )
    .then((result)=>{           
      this.setState({
        submitting: false,
        data:result.data
      })
      this.props.SigninCheck(this.state.username,this.state.password)
    }).catch((err)=>{
      console.log(err)
      this.setState({
        signInError: true,
        username: '',
        password: '',
      })
      setTimeout(() => {
          this.setState({ 
            signInError: false,
            submitting: false
          });
      }, 1500)
    })
    // this.refs.notificationSystem.addNotification({
    //   message: 'Notification message',
    //   level: 'success',
    //   autoDismiss: 3,
    //   position: 'tc'
    // })
    
  }

  componentDidMount(){
    // this.state._notificationSystem = this.refs.notificationSystem;   
  }

  render() {  
    const { signInError, submitting } = this.state
    const {t} = this.props
    return (
      <div>        
        <div style={{ ...styles.main, backgroundColor: lightBlue500 }}>
            <Card style={styles.card}>               
                <div style={styles.avatar}>
                    <Avatar backgroundColor={pinkA200} icon={<LockIcon />} size={60} />
                </div>
                {signInError && <Snackbar open autoHideDuration={2000} message='SignIn ERROR!' bodyStyle={styleSnackbar} />}
                <form onSubmit={this.submit}>
                    <div style={styles.form}>
                      <div style={styles.input} >
                          <TextField
                              name="username"                             
                              floatingLabelText={t('common:username')}
                              disabled={submitting}
                              onChange={this.handleChange}
                              value= {this.state.username}
                          />
                      </div>
                      <div style={styles.input}>
                          <TextField
                              name="password"                           
                              floatingLabelText={t('common:password')}
                              type="password"
                              disabled={submitting}
                              onChange={this.handleChange}
                              value= {this.state.password}                             
                          />
                      </div>
                    </div>
                    <CardActions >
                      <LanguageBtn />
                      <RaisedButton
                          type="submit"
                          backgroundColor = {lightBlue500}
                          disabled={submitting}
                          icon={submitting && <CircularProgress size={25} thickness={2} />}
                          label={t('common:submit')}
                          labelStyle = {{color:'#fff'}}
                          fullWidth/>                                            
                    </CardActions>
                </form>
            </Card>
        </div>
      </div>
    );
  }
}

export default translate('')(SiginFrom)