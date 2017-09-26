import React, { Component } from 'react';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';

import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import FlatButton from 'material-ui/FlatButton';
// COLOR
import { indigo900, redA700 } from 'material-ui/styles/colors';
// ICON
import Terminal from 'react-icons/lib/go/terminal';
import ActionHelpOutline from 'material-ui/svg-icons/action/help-outline';

import CopyToClipboard from 'react-copy-to-clipboard';
import { SshWebURL, SshWebHost } from '../resource';

/**
  ssh web of button
  Example:
  ```
  <SshWebBtn
    data = {data}
    {...this.props}
  />
  ```
 */
class SshWebBtn extends Component {
  static propTypes = {
    /**
      Will refresh reviewTable after count
    */
    start: React.PropTypes.instanceOf(Date).isRequired,
    /**
      Will refresh reviewTable after count
    */
    refresh: React.PropTypes.func.isRequired,
    /**
        the instance information
      */
    data: React.PropTypes.object.isRequired,
  };
  static defaultProps = {
    data: {
      id: '2',
      statusId: 3,
      projectCode: null,
      username: 'mochatest',
      password: 'k7xrtjep',
      startedAt: '2018-12-31T16:00:00.000Z',
      endedAt: '2019-01-15T15:59:59.000Z',
      createdAt: '2017-09-12T07:35:30.973Z',
      updatedAt: '2017-09-12T07:35:31.753Z',
      userId: '99999999',
      machine: {
        id: '3',
        label: 'm3',
        name: 'm3',
        description: null,
        gpuAmount: 1,
        gpuType: 'v100',
        statusId: 1,
      },
      container: {
        id: '2',
        serviceIp: '5.5.6.6',
        podIp: '8.7.8.7',
        sshPort: '9527',
        ports: [],
      },
      image: {
        id: '30',
        label: '201707v001',
        name: 'tensorflow',
        path: null,
        description: null,
      },
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      // refreshTimes: 0
    };
  }
  componentDidMount() {
    if (this.props.data !== undefined && this.props.data.statusId !== 7
      && this.props.data.statusId !== 3) {
      this.timer = setInterval(this.tick, 50);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  tick = () => {
    // Adjustment server and client time
    if (this.props.start < new Date(moment(this.props.data.createdAt).utc(8))) {
      this.setState({
        elapsed: new Date() - this.props.start,
      });
    } else {
      this.setState({
        elapsed: new Date() - new Date(moment(this.props.data.createdAt).utc(8)),
      });
    }

    const elapsed = Math.round(this.state.elapsed / 100);
    const seconds = (elapsed / 10).toFixed(1);
    // console.log(seconds);
    if (seconds > 6 && seconds < 7) {
      this.props.refresh();
      this.setState({
        elapsed: new Date() - new Date(moment(this.props.data.createdAt).utc(8)),
        // refreshTimes: 1
      });
    }
  };
  render() {
    const { t } = this.props;
    // console.log(this.props.data.statusId)

    // console.log('now:' + new Date());
    // console.log('new:' + new Date(moment(this.props.data.createdAt).utc(8)));

    const elapsed = Math.round(this.state.elapsed / 100);
    const seconds = (elapsed / 10).toFixed(1);
    return (
      <div>
        {this.props.data !== undefined ? (
          <div>
            {this.props.data !== undefined &&
              this.props.data.statusId === 3 && (
                <div>
                  <ReactGA.OutboundLink
                    eventLabel="SSHweb"
                    to={SshWebURL +
                      this.props.data.username +
                      '@' +
                      this.props.data.container.podIp +
                      ':' +
                      this.props.data.container.sshPort +
                      '&ssh_once=true' +
                      '&location=' +
                      this.props.data.id
                    }
                    target="_blank"
                  >
                    <CopyToClipboard
                      text={this.props.data.password}
                      onCopy={() => this.props.copyNotify(t('common:alreadyCopy'), 'password')}
                    >
                      <FlatButton
                        icon={<Terminal size={28} color="black" />}
                        label={
                          <span>
                            <font color={indigo900}>
                              <b>{'ssh Web'}</b>
                            </font>
                          </span>
                        }
                      />
                    </CopyToClipboard>
                  </ReactGA.OutboundLink>
                </div>
              )}
            {(this.props.data.statusId === 2 || this.props.data.statusId === 8)
              && seconds < 10 && seconds > 0 && (
              <div
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                <div data-tip data-for="status">
                  <b>{seconds}s</b>
                </div>
                <ReactTooltip id="status" place="bottom" effect="solid">
                  <span>{t('common:status.count')}</span>
                </ReactTooltip>
              </div>
              )}
            {this.props.data.statusId === 2 && seconds > 6 && (
              <div
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                <div data-tip data-for="statusHelp">
                  {seconds}s <ActionHelpOutline Color={redA700} />
                </div>
                <ReactTooltip id="statusHelp" place="bottom" effect="solid">
                  <span>{t('common:status.help')}</span>
                </ReactTooltip>
              </div>
            )}
            {this.props.data.statusId === 7 && (
              <div
                style={{ display: 'inline-block', verticalAlign: 'middle' }}
              >
                <div data-tip data-for="statusHelp">
                  <ActionHelpOutline Color={redA700} />
                </div>
                <ReactTooltip id="statusHelp" place="bottom" effect="solid">
                  <span>{t('common:status.help')}</span>
                </ReactTooltip>
              </div>
            )}
          </div>
        ) : (
          <FlatButton
            icon={<Terminal size={28} color="black" />}
            label={
              <span>
                <font color={indigo900}>
                  <b>{'ssh Web'}</b>
                </font>
              </span>
            }
            href={SshWebHost}
            target="_blank"
          />
        )}
      </div>
    );
  }
}
export default translate('')(SshWebBtn);
