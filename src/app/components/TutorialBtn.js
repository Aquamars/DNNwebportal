import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// ICON
import ImagePictureAsPdf from 'material-ui/svg-icons/image/picture-as-pdf';
// PDF
import { displayPDF } from '../utils/MakeTutorialFile';

/**
  Tutorial Button
  Example:
  ```
  <TutorialBtn />
  ```
 */
class TutorialBtn extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };
  handleRequestClose = () => {
    this.setState({ open: false });
  };
  openPDF = (lang) => {
    this.setState({ open: false });
    displayPDF(localStorage.getItem('itriUser'), lang);
    // GA
    ReactGA.event({
      category: 'PDF',
      action: 'open',
      label: lang,
    });
  };
  render() {
    const { t } = this.props;
    return (
      <div>
        <FlatButton
          label={<b>{t('common:tutorial')}</b>}
          style={{ color: '#fff' }}
          icon={<ImagePictureAsPdf />}
          data-tip
          data-for="pdf"
          onTouchTap={() => this.openPDF(t('common:pdfLang'))}
        />
        <ReactTooltip id="pdf" place="bottom" effect="solid">
          <span>{'PDF ' + t('common:tutorial')}</span>
        </ReactTooltip>
      </div>
    );
  }
}
export default translate('')(TutorialBtn);

// <Popover
//  open={this.state.open}
//  anchorEl={this.state.anchorEl}
//  anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
//  targetOrigin={{horizontal: 'left', vertical: 'top'}}
//  onRequestClose={this.handleRequestClose}
// >
// <Menu>
//   <MenuItem primaryText='Eng' onTouchTap={()=>this.openPDF('eng')}/>
//   <MenuItem primaryText='繁中' onTouchTap={()=>this.openPDF('tc')}/>
// </Menu>
// </Popover>
