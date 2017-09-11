/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';

import {deepOrange500} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import autoprefixer from 'material-ui/utils/autoprefixer'

// components
import MainContainer from './components/MainContainer'
import SigninFrom from './components/SigninFrom'

import ReactGA from 'react-ga';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
})

const styles = {
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
    },
}
const prefixedStyles = {}
if (!prefixedStyles.main) {
  const prefix = autoprefixer(muiTheme);
  prefixedStyles.wrapper = prefix(styles.wrapper);
  prefixedStyles.main = prefix(styles.main);
  prefixedStyles.body = prefix(styles.body);
  prefixedStyles.bodySmall = prefix(styles.bodySmall);
  prefixedStyles.content = prefix(styles.content);
  prefixedStyles.contentSmall = prefix(styles.contentSmall);
}


class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      SignInCheck: false,
      username: '',
      token: ''
    };
  }  

// handle signIn and get username,password
  handleSigninCheck = (username, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('itriUser', username)
    this.setState({
      SignInCheck: true,
      username: username,
      token: token
    })
     console.log(localStorage.getItem('token'))
  }

  handleSignOut = () => {

    // GA
    ReactGA.event({
      category: 'SignOut',
      action: 'Success',
      label: localStorage.getItem('itriUser')
    })

    localStorage.setItem('token', '')
    localStorage.setItem('itriUser', '')
    this.setState({
      SignInCheck: false,
      username: '',
      password: '',
      token: ''
    })
     console.log(localStorage.getItem('token'))
  }
  componentDidMount(){
    const ele = document.getElementById('ipl-progress-indicator')
    if(ele){
      setTimeout(() => {
        ele.classList.add('available')
        setTimeout(() => {
          ele.outerHTML = ''
        }, 2000)
      }, 1000)
    }
    // GA
    ReactGA.initialize('UA-99253812-1')
    ReactGA.event({
      category: 'pageView',
      action: 'Access Web'
    });
  }

  render() {
      if(localStorage.getItem('token')){
        return (
            <MainContainer 
              user={localStorage.getItem('itriUser')} 
              token={localStorage.getItem('token')} 
              SignOut={this.handleSignOut}
            />
        )
      }else{
        return (
          <MuiThemeProvider muiTheme={muiTheme}>
            <SigninFrom SigninCheck={this.handleSigninCheck}/>
          </MuiThemeProvider>
        )
      }
  }
}
export default Main;
