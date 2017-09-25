import React from 'react';
import ReactTooltip from 'react-tooltip';
// i18n
import { translate } from 'react-i18next';
// ICON
import TiTick from 'react-icons/lib/ti/tick';
import TiTimes from 'react-icons/lib/ti/times';
import TiInfoLarge from 'react-icons/lib/ti/info-large';
// COLOR
import { orangeA700, greenA700, green500, redA700 } from 'material-ui/styles/colors';

class Hints extends React.PureComponent {
  render() {
    const { t } = this.props;
    return (
      <div>
        <font size={3} data-tip data-for="maxHint">
          <br />
          {this.props.increaseDay > 0 &&
          this.props.increaseDay <= 31 && (
            <span>
              {'\u00A0'}
              <TiTick color={greenA700} /> {t('common:interval')} :{' '}
              <font color={green500}>
                {this.props.increaseDay} {t('common:days')}
              </font>
            </span>
          )}
          {(this.props.increaseDay <= 0 || this.props.increaseDay > 31) && (
            <span>
              {'\u00A0'}
              <TiTimes color={redA700} /> {t('common:interval')} :{' '}
              <font color={redA700}>
                {this.props.increaseDay} {t('common:days')}
              </font>
            </span>
          )}
          <br />
          {this.props.availableNumber !== 0 && (
            <span>
              {'\u00A0'}
              <TiTick color={greenA700} />{' '}
              {t('common:createStep.avalableInstance')} :{' '}
              <font color={greenA700}>
                <b>{this.props.availableNumber}</b>
              </font>
            </span>
          )}
          {this.props.availableNumber === 0 && (
            <span>
              {'\u00A0'}
              <TiTimes color={redA700} />{' '}
              {t('common:createStep.avalableInstance')} :{' '}
              <font color={redA700}>
                <b>{this.props.availableNumber} </b>
                {t('common:noInstance')}
              </font>
            </span>
          )}
          <br />
          {'\u00A0'}
          {this.props.currentInstanceNum !== 0 && (
            <span>
              <TiInfoLarge color={orangeA700} />{' '}
              {t('common:createStep.currentInstance')} :{' '}
              <font color={greenA700}>
                <b>{this.props.currentInstanceNum}</b>
              </font>
            </span>
          )}
          <br />
          {'\u00A0'}
          <span>
            <TiInfoLarge color={orangeA700} /> {t('common:createStep.limitDay')}{' '}
            :{' '}
            <font color={orangeA700}>
              <b>{30}</b> {t('common:days')}
            </font>
          </span>
        </font>
        <ReactTooltip id="maxHint" place="top" effect="solid">
          <span>{t('common:maxHint')}</span>
        </ReactTooltip>
      </div>
    );
  }
}
export default translate('')(Hints);
