import React, { Component } from 'react';
import { Friend } from 'react-line-social';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
// i18n
import { translate } from 'react-i18next';
// GA
import ReactGA from 'react-ga';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminAdd } from './Admin/actionAdmin';

import { lineCode2, DnnLogo } from '../image';
import pjson from '../../../package.json';

/**
  Footer
  Example:
  ```
  <Footer />
  ```
 */
class Footer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
    };
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
    // GA
    ReactGA.event({
      category: 'Information',
      action: !this.state.open ? 'open' : 'close',
    });
  };

  switchLineLang = (lang) => {
    switch (lang) {
      case 'eng':
        return (<Friend lineid="@bsw9983a" locale="en" count home />);
      case 'tc':
        return (<Friend lineid="@bsw9983a" count home />);
      default:
        return (<Friend lineid="@bsw9983a" count home />);
    }
  }

  render() {
    const { t } = this.props;
    // console.log(window.location.href)
    return (
      <Paper zDepth={1}>
        <Drawer
          width={300}
          openSecondary={true}
          open={this.state.open}
          containerStyle={{ overflow: 'hidden' }}
        >
          <img width="100%" src={lineCode2} onClick={this.props.AdminAdd} alt="Line Code" />
          <div style={{ textAlign: 'center' }}>
            <Avatar src={DnnLogo} size={100} />
            <br />
            {'v ' + pjson.version }
            <br />
            {'© 2017 Industrial Technology Research Institute.'}
          </div>
        </Drawer>
        <BottomNavigation>
          <BottomNavigationItem icon={<div></div>} />
          <BottomNavigationItem
            icon={<img src={window.location.href + t('common:logoSrc')} alt="DNNLogo" />}
            onTouchTap={this.handleToggle}
          />
          <BottomNavigationItem
            icon={this.switchLineLang(t('common:pdfLang'))}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ AdminAdd }, dispatch);
}

export default connect(null, matchDispatchToProps)(translate('')(Footer));
