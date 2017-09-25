import React from 'react';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
// GA
import ReactGA from 'react-ga';
// COLOR
import { redA700 } from 'material-ui/styles/colors';
// i18n
import { translate } from 'react-i18next';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// ICON
import MdDelete from 'react-icons/lib/md/delete';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';

import { errorNotify } from './Notify/actionNotify';
// style
import { muiStyle } from '../myTheme';

import { ApiDeleteSchedule } from '../resource';


/**
  Delete the instance
  Example:
  ```
  <DeleteModal
    data = {data}
    refresh={this.getData}
    token={this.props.token}
  />
  ```
 */
class DeleteModal extends React.Component {
  static propTypes = {
    /**
      The user token for call api
    */
    token: React.PropTypes.string.isRequired,
    /**
      Will refresh reviewTable after delete
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
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      loading: false,
      comfirm: false,
    };
    // console.log(this.props.data)
    // console.log(this.props.id)
  }
  handleOpen = () => {
    this.setState({ open: true });
    // GA
    ReactGA.event({
      category: 'DeleteModal',
      action: 'open',
      label: this.props.data.id,
    });
  };
  handleClose = () => {
    this.setState({ open: false });
    // GA
    ReactGA.event({
      category: 'DeleteModal',
      action: 'close',
      label: this.props.data.id,
    });
  };
  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 1300);
    });
  };
  handleSubmit = () => {
    if (!this.state.comfirm) {
      this.setState({
        loading: true,
      });
      const api = ApiDeleteSchedule + this.props.data.id;
      fetch(api, {
        method: 'delete',
        headers: {
          'x-access-token': this.props.token,
          'Content-Type': 'application/json',
          Accepts: 'application/json',
        },
        // body:data
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            this.dummyAsync(() => this.setState({ loading: false, comfirm: true }));
          }
          return response.json();
        })
        .then((data) => {
          console.log('data:' + data);
        })
        .catch((err) => {
          console.log('err:' + err);
          this.props.errorNotify('ERROR : Delete Schedule');

          this.setState({ open: false, comfirm: false });
          this.props.refresh();
          // GA
          ReactGA.event({
            category: 'DeleteModal',
            action: 'delete false',
            label: this.props.data.id,
          });
        });
    } else {
      console.log('refresh');
      this.setState({ open: false, comfirm: false });
      this.props.refresh();
      // GA
      ReactGA.event({
        category: 'DeleteModal',
        action: 'deleted',
        label: this.props.data.id,
      });
    }
  };

  render() {
    const { t } = this.props;
    const actions = [
      <FlatButton
        label={t('common:cancel')}
        style={
          this.state.comfirm ? (
            { color: 'white' }
          ) : (
            { color: muiStyle.palette.primary1Color }
          )
        }
        disabled={this.state.comfirm || this.state.loading}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label={t('common:submit')}
        secondary={true}
        disabled={this.state.loading}
        onTouchTap={this.handleSubmit}
      />,
    ];
    // console.log(this.props.data);
    return (
      <div>
        <FlatButton
          label=""
          style={{ color: redA700 }}
          fullWidth={true}
          data-tip
          data-for="remove"
          onTouchTap={this.handleOpen}
          icon={<ActionDeleteForever />}
        />
        <ReactTooltip id="remove" place="bottom" effect="solid">
          <span>{t('common:remove.remove')}</span>
        </ReactTooltip>
        <Dialog
          title={
            <div>
              <b>{t('common:remove.comfirmRemove')}</b>
            </div>
          }
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          {this.state.comfirm ? (
            <div>
              <b>{t('common:deletedSuccess')}</b>
            </div>
          ) : (
            <div>
              {this.state.loading ? (
                <div style={{ textAlign: 'center' }}>
                  <CircularProgress
                    size={80}
                    color={muiStyle.palette.primary1Color}
                    thickness={5}
                  />
                </div>
              ) : (
                <div>
                  <font color={redA700}>
                    <MdDelete />
                    <b> {t('common:remove.warning')}</b>
                  </font>
                  <List>
                    <Divider style={{ color: redA700 }} />
                    <ListItem
                      primaryText={
                        <span>
                          <b>{t('common:dateRange')}</b>
                        </span>
                      }
                      secondaryText={
                        <p>
                          {moment(this.props.data.startedAt).format('YYYY-MM-DD')}{' '}
                          ~{' '}
                          {moment(this.props.data.endedAt).format('YYYY-MM-DD')}
                        </p>
                      }
                    />
                    <ListItem
                      primaryText={<b>{t('common:scheduleID')}</b>}
                      secondaryText={this.props.data.id}
                    />
                    <ListItem
                      primaryText={<b>{t('common:image')}</b>}
                      secondaryText={this.props.data.image.name}
                    />
                    <ListItem
                      primaryText={
                        <span>
                          <b>{t('common:gpuType')} </b>
                        </span>
                      }
                      secondaryText={
                        <p>
                          <b>{this.props.data.machine.gpuType}</b>
                        </p>
                      }
                    />
                    <ListItem
                      style={{ display: 'none' }}
                      primaryText={<b>{t('common:project')}</b>}
                      secondaryText={this.props.data.projectCode}
                    />
                    <Divider style={{ color: redA700 }} />
                  </List>
                </div>
              )}
            </div>
          )}
        </Dialog>
      </div>
    );
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ errorNotify }, dispatch);
}
export default connect(null, matchDispatchToProps)(translate('')(DeleteModal));
