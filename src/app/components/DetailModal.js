import React from 'react';
// GA
import ReactGA from 'react-ga';
// i18n
import { translate } from 'react-i18next';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CopyToClipboard from 'react-copy-to-clipboard';
import moment from 'moment';
import { Tab, Tabs } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ReactTooltip from 'react-tooltip';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
// theme
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// ICON
import ActionToc from 'material-ui/svg-icons/action/toc';
// COLOR
import { green500, indigo900 } from 'material-ui/styles/colors';
import { muiStyle, muiTheme } from '../myTheme';

import { copyNotify } from './Notify/actionNotify';
import StatusHandler from './StatusHandler';
import GpuHandler from './GpuHandler';
import HoverDiv from './HoverDiv';
import ReviewCalendar from './ReviewCalendar/ReviewCalendar';
import FtpInfoModal from './FtpInfoModal';
import SshWebBtn from './SshWebBtn';

const textCenter = { textAlign: 'center' };
/**
  Show more infomation of the instance
  Example:
  ```
  <DetailModal
    data = {data}
    iconColor = {grey500}
    showStatus={false}
  />
  ```
*/
class DetailModal extends React.Component {
  static propTypes = {
    /**
      Setting the button color
    */
    iconColor: React.PropTypes.string,
    /**
    enable show status
    */
    showStatus: React.PropTypes.bool,
    /**
    the instance information
    */
    data: React.PropTypes.object.isRequired,
  }

  static defaultProps = {
    iconColor: muiStyle.palette.primary1Color,
    showStatus: true,
    data: {
      id: '2',
      statusId: 1,
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
  }
  constructor(props) {
    super(props);
    const increaseDay = moment(this.props.data.endedAt).diff(moment(this.props.data.startedAt), 'days');
    const excuteDay = moment(this.props.data.startedAt).isBefore(moment()) ? moment().diff(moment(this.props.data.startedAt), 'days') : 0;
    const leftDay = moment(this.props.data.endedAt).diff(moment(), 'days');
    this.state = {
      open: false,
      increaseDay,
      excuteDay,
      leftDay,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
    // GA
    ReactGA.event({
      category: 'DetailModal',
      action: 'open',
      label: this.props.data.id,
    });
  }

  handleClose = () => {
    this.setState({ open: false });
    // GA
    ReactGA.event({
      category: 'DetailModal',
      action: 'close',
      label: this.props.data.id,
    });
  }

  renderTabOne = () => {
    const { t } = this.props;
    // console.log(this.props.data)
    const sshCMD = 'ssh ' + this.props.data.username + '@' + this.props.data.container.podIp + ' -p ' + this.props.data.container.sshPort;
    return (
      <div>
        <List>
          <div style={{ margin: '0px auto' }}>
            <div style={{ display: 'inline-block' }}><span><FtpInfoModal iconColor={'#FF3D00'} /></span></div>
            <div style={{ display: 'inline-block' }}><span>{ (this.props.data.statusId === 2 || this.props.data.statusId === 3) && <SshWebBtn {...this.props} />}</span></div>
          </div>
          <CopyToClipboard
            text={this.props.data.container.podIp}
            onCopy={() => this.props.copyNotify(t('common:alreadyCopy'), 'ip')}
          >
            <ListItem
              primaryText={<span><b>{t('common:ip')}</b></span>}
              secondaryText={this.props.data.container.podIp}
            />
          </CopyToClipboard>
          <CopyToClipboard
            text={this.props.data.container.sshPort}
            onCopy={() => this.props.copyNotify(t('common:alreadyCopy'), 'port')}
          >
            <ListItem
              primaryText={<span><b>{t('common:port')}</b></span>}
              secondaryText={this.props.data.container.sshPort}
            />
          </CopyToClipboard>
          <CopyToClipboard
            text={this.props.data.username}
            onCopy={() => this.props.copyNotify(t('common:alreadyCopy'), 'account')}
          >
            <ListItem
              primaryText={<span><b>{t('common:sshAccount')}</b></span>}
              secondaryText={this.props.data.username}
            />
          </CopyToClipboard>
          <CopyToClipboard
            text={this.props.data.password}
            onCopy={() => this.props.copyNotify(t('common:alreadyCopy'), 'password')}
          >
            <ListItem
              primaryText={<span><b>{t('common:sshPassword')}</b></span>}
              secondaryText={this.props.data.password}
            />
          </CopyToClipboard>
          <CopyToClipboard
            text={sshCMD}
            onCopy={() => this.props.copyNotify(t('common:alreadyCopy'), 'sshCMD')}
          >
            <ListItem
              primaryText={<span><font color={indigo900}><b>{t('common:copySshCmd')}</b></font></span>}
              secondaryText={sshCMD}
            />
          </CopyToClipboard>
          <ListItem
            primaryText={<span><b>{t('common:image')} </b></span>}
            secondaryText={<p><b>{this.props.data.image.name}</b></p>}
            initiallyOpen={true}
            nestedItems={(this.props.data.image.datasetPath != null) && [
              <ListItem
                primaryText={<b>{t('common:createStep.dataSetPath')}</b>}
                secondaryText={<p><b>{this.props.data.image.path}</b></p>}
              />,
              <ListItem
                primaryText={<b>{t('common:createStep.id')}/{t('common:createStep.password')}</b>}
                secondaryText={
                  <HoverDiv
                    account={this.props.data.username}
                    password={this.props.data.instance.datasetPassword}
                  />
                }
              />,
            ]}
          />
          <ListItem
            style={{ display: 'none' }}
            primaryText={<span><b>{t('common:project')} </b></span>}
            secondaryText={<p><b>{this.props.data.projectCode}</b></p>}
          />
          <Divider style={{ color: green500 }} />
        </List>
      </div>
    );
  }

  renderTabTwo = () => {
    const { t } = this.props;
    return (
      <div>
        <List>
          <ListItem
            primaryText={<span><b>{t('common:dateRange')} </b></span>}
            secondaryText={<p>{moment(this.props.data.startedAt).format('YYYY-MM-DD')} ~ {moment(this.props.data.endedAt).format('YYYY-MM-DD')}</p>}
            initiallyOpen={true}
          />
        </List>
        <Divider />
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn style={textCenter}>{<font color="#000"><b>{t('common:interval')}</b></font>}</TableHeaderColumn>
              <TableHeaderColumn style={textCenter}>{<font color="#000"><b>{t('common:excuteDay')}</b></font>}</TableHeaderColumn>
              {this.state.leftDay > 0 && <TableHeaderColumn style={textCenter}>{<font color="#000"><b>{t('common:leftDay')} </b></font>}</TableHeaderColumn>}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn style={textCenter}>{<p><b><font>{this.state.increaseDay} {t('common:days')}</font></b></p>}</TableRowColumn>
              <TableRowColumn style={textCenter}>{<p><b><font color={green500}>{this.state.excuteDay} {t('common:days')}</font></b></p>}</TableRowColumn>
              {this.state.leftDay > 0 && <TableRowColumn style={textCenter}> <p><b><font color={green500}>{this.state.leftDay} {t('common:days')}</font></b></p></TableRowColumn>}
            </TableRow>
          </TableBody>
        </Table>
        <Divider />
        <ReviewCalendar
          defualtLoading={false}
          startDate={moment(this.props.data.startedAt).format('YYYY-MM-DD')}
          endDate={moment(this.props.data.endedAt).format('YYYY-MM-DD')}
          showDetail={true}
        />
      </div>
    );
  }

  render() {
    const { t, iconColor, showStatus } = this.props;
    const optionsStyle = {
      marginRight: 'auto',
    };

    // console.log('Detail:')
    // console.log(this.props.data)
    return (
      <div>
        <FlatButton
          style={{ color: iconColor }}
          data-tip
          data-for="detail"
          labelPosition="before"
          icon={<ActionToc />}
          onTouchTap={this.handleOpen}
        />
        <ReactTooltip id="detail" place="bottom" effect="solid">
          <span>{t('common:detail')}</span>
        </ReactTooltip>
        <Dialog
          title={
            <div>
              <b>{this.props.data.machine.label}-{this.props.data.id}</b>
              {
                showStatus &&
                <div style={{ margin: '0px auto' }}>
                  <div style={{ display: 'inline-block' }}><span> {<StatusHandler statusId={this.props.data.statusId} />} </span></div>
                  <div style={{ display: 'inline-block', marginLeft: '1%' }}><span> {<GpuHandler gpu={this.props.data.machine.gpuType} />} </span></div>
                </div>
              }
            </div>
          }
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div style={optionsStyle}>
            <Divider />
            <MuiThemeProvider muiTheme={muiTheme}>
              <Tabs>
                <Tab label={<b>{t('common:instance')} & {t('common:image')}</b>} value="a">
                  {this.renderTabOne()}
                </Tab>
                <Tab label={<b>{t('common:dateRange')}</b>} value="b">
                  {this.renderTabTwo()}
                </Tab>
              </Tabs>
            </MuiThemeProvider>
          </div>
        </Dialog>
      </div>
    );
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ copyNotify }, dispatch);
}
export default connect(null, matchDispatchToProps)(translate('')(DetailModal));
