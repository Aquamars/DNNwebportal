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
import SiginFrom from './components/SiginFrom'
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
      password: ''
    };
  }  

// handle signIn and get username,password
  handleSigninCheck = (username, password) => {
    this.setState({
      SignInCheck: true,
      username: username,
      password: password
    })
  }

  handleSignOut = () => {
    this.setState({
      SignInCheck: false,
      username: '',
      password: ''
    })
  }

  render() {
      if(this.state.SignInCheck){
        return (
            <MainContainer 
            user={this.state.username} 
            pass={this.state.password} 
            SignOut={this.handleSignOut}/>
        )
      }else{
        return (
          <MuiThemeProvider muiTheme={muiTheme}>
            <SiginFrom SigninCheck={this.handleSigninCheck}/>
          </MuiThemeProvider>
        )
      }
  }
}

export default Main;
