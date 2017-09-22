import React, { Component } from 'react';
// API
import axios from 'axios';
// GA
import ReactGA from 'react-ga';
// i18N
import { translate } from 'react-i18next';

// Form elements
import { Card, CardActions } from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
// ICON
import LockIcon from 'material-ui/svg-icons/action/lock-outline';

import LanguageBtn from './LanguageBtn';
import { muiStyle } from '../myTheme';

import { API_SIGNIN } from '../resource';

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
    padding: '0 2.5em 2.5em 2.5em',
  },
  input: {
    display: 'flex',
  },
};
const styleSnackbar = { backgroundColor: '#ff405c' };

class SigninFrom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      signInError: false,
      submitting: false,
      data: [],
    };
  }

  handleChange = (event, value) =>
    this.setState({ [event.target.name]: value });

  submit = (event) => {
    event.preventDefault();

    this.setState({ submitting: true });

    axios
      .get(API_SIGNIN, {
        headers: {
          Accept: 'application/json',
          'x-username': this.state.username,
          'x-password': this.state.password,
        },
      })
      .then((result) => {
        console.log(result);
        this.setState({
          submitting: false,
          data: result.data,
        });
        this.props.SigninCheck(this.state.username, result.data.token);
        // GA
        ReactGA.event({
          category: 'SignIn',
          action: 'Success',
          label: this.state.username,
        });
      })
      .catch((err) => {
        console.log(err);
        // GA
        ReactGA.event({
          category: 'SignIn',
          action: 'Fail',
          label: this.state.username,
        });

        this.setState({
          signInError: true,
          username: '',
          password: '',
        });
        setTimeout(() => {
          this.setState({
            signInError: false,
            submitting: false,
          });
        }, 1500);
      });

    // this.refs.notificationSystem.addNotification({
    //   message: 'Notification message',
    //   level: 'success',
    //   autoDismiss: 3,
    //   position: 'tc'
    // })
  };

  render() {
    const { signInError, submitting } = this.state;
    const { t } = this.props;
    return (
      <div>
        <div
          style={{
            ...styles.main,
            backgroundColor: muiStyle.palette.primary1Color,
          }}
        >
          <Card style={styles.card}>
            <div style={styles.avatar}>
              <Avatar
                backgroundColor={muiStyle.palette.accent1Color}
                icon={<LockIcon />}
                size={60}
              />
            </div>
            {signInError && (
              <Snackbar
                open
                autoHideDuration={2000}
                message="SignIn ERROR!"
                bodyStyle={styleSnackbar}
              />
            )}
            <form onSubmit={this.submit}>
              <div style={styles.form}>
                <div style={styles.input}>
                  <TextField
                    name="username"
                    floatingLabelText={t('common:username')}
                    disabled={submitting}
                    onChange={this.handleChange}
                    value={this.state.username}
                    underlineFocusStyle={{
                      borderColor: muiStyle.palette.primary1Color,
                    }}
                  />
                </div>
                <div style={styles.input}>
                  <TextField
                    name="password"
                    floatingLabelText={t('common:password')}
                    type="password"
                    disabled={submitting}
                    onChange={this.handleChange}
                    value={this.state.password}
                    underlineFocusStyle={{
                      borderColor: muiStyle.palette.primary1Color,
                    }}
                  />
                </div>
              </div>
              <div style={styles.input}>
                <LanguageBtn />
              </div>
              <CardActions style={{ margin: 8 }}>
                <RaisedButton
                  type="submit"
                  backgroundColor={muiStyle.palette.primary1Color}
                  disabled={submitting}
                  icon={
                    submitting && <CircularProgress size={25} thickness={2} />
                  }
                  label={t('common:submit')}
                  labelStyle={{ color: '#fff' }}
                  fullWidth
                />
              </CardActions>
            </form>
          </Card>
          <div style={{ marginTop: '0.5em' }}>
            <img
              src={window.location.href + t('common:wlogoSrc')}
              width="200px"
              alt={'logo'}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default translate('')(SigninFrom);
