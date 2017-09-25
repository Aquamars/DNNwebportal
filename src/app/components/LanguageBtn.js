import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
// ICON
import ActionLanguage from 'material-ui/svg-icons/action/language';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
import i18n from '../utils/i18n';

const toggle = lng => i18n.changeLanguage(lng);
/**
  Switch Language Button
  Example:
  ```
  <LanguageBtn color={'#666'} />
  ```
 */
class LanguageBtn extends Component {
  static propTypes = {
    /**
      Setting the button color
    */
    color: React.PropTypes.string,
  }

  static defaultProps = {
    color: '#000',
  }
  state = {
    valueSingle: '3',
  }
  handleChangeSingle = (event, value) => {
    // console.log(value)
    switch (value) {
      case '0' :
        toggle('en');
        // GA
        ReactGA.event({
          category: 'Language',
          action: 'switch',
          label: 'en',
        });
        break;
      case '1':
        toggle('tw');
        // GA
        ReactGA.event({
          category: 'Language',
          action: 'switch',
          label: 'tw',
        });
        break;
      default:
        toggle('en');
        // GA
        ReactGA.event({
          category: 'Language',
          action: 'switch',
          label: 'en',
        });
        break;
    }
  }
  render() {
    const { t } = this.props;
    return (
      <div
        style={{ verticalAlign: 'middle' }}
        data-tip
        data-for="lang"
      >
        <IconMenu
          iconButtonElement={
            <FlatButton
              style={{ color: this.props.color }}
              label={<b>{t('common:language')}</b>}
              icon={<ActionLanguage color={this.props.color} />}
            />
          }
          onChange={this.handleChangeSingle}
          value={this.state.valueSingle}
        >
          <MenuItem value="0" primaryText="Eng" />
          <MenuItem value="1" primaryText="繁中" />
        </IconMenu>
        <ReactTooltip id="lang" place="bottom" effect="solid">
          <span>{t('common:switchLanguage')}</span>
        </ReactTooltip>
      </div>
    );
  }
}
export default translate('')(LanguageBtn);
