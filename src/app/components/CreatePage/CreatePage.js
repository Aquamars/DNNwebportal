import React from 'react';
import moment from 'moment';
// i18n
import { translate } from 'react-i18next';
// GA
import ReactGA from 'react-ga';
// Animation
import 'animate.css/animate.min.css';
import { Animated } from 'react-animated-css';
// API
import axios from 'axios';
import { ApiGetMachine, ApiCreateSchedule, ApiCheckInstance, ApiGetImage, gpuTypeList } from '../../resource';
// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { errorNotify, copyNotify } from '../Notify/actionNotify';
// ICON
import ImageViewComfy from 'material-ui/svg-icons/image/view-comfy';
import CommunicationContactMail from 'material-ui/svg-icons/communication/contact-mail';
import ActionLabel from 'material-ui/svg-icons/action/label';
// COLOR
import { white, orangeA700 } from 'material-ui/styles/colors';
import { muiStyle, muiTheme } from '../../myTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { List } from 'material-ui/List';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ReactTooltip from 'react-tooltip';
import CircularProgress from 'material-ui/CircularProgress';
import ReviewCalendar from '../ReviewCalendar/ReviewCalendar';
import Hints from './Hints';
import ConfirmPage from './ConfirmPage';
import ProjectCode from './ProjectCode';
import FinishAutoPage from './FinishAutoPage';

const startStep = 0;

class CreatePage extends React.Component {
  static propTypes = {
    currentInstanceNum: React.PropTypes.number.isRequired,
  };
  constructor(props) {
    super(props);
    console.log('currentInstanceNumthis', this.props.currentInstanceNum);
    this.state = {
      loading: false,
      finished: false,
      stepIndex: startStep,
      submitting: false,
      projectNum: null,
      selectprojectNum: null,
      gpu: 'GTX1080',
      gpuNumber: '4',
      startDate: new Date(moment().format('YYYY-MM-DD')),
      // startDate: new Date(moment().add(1,'day').format('YYYY-MM-DD')),
      endDate: null,
      increaseDay: 0,
      instanceNum: 1,
      queryNumber: 0, // number of avilable machines
      loadingCreate: false,
      createdRespData: {},
      availableNumber: [], // arrary of avilable instances
      availableMachines: [], // arrary of avilable machines
      gpuType: gpuTypeList[0], // selected gputype
      instanceArr: [{ instance: 0, image: 0, imageDesc: '' }],
      imageArr: [
        'Cowboy Bebop',
        'Trigun',
        'Baccano',
        'Chobits',
        'Lupin the third',
      ],
    };
  }
  componentWillMount() {
    this.getImageApi();
  }
  getStepContent(stepIndex) {
    const { t } = this.props;
    const { loadingCreate } = this.state;
    switch (stepIndex) {
      case -1:
        return (
          <div>
            {this.renderSelectGpuWithNum()}
          </div>
        );
      case 0:
        return (
          <div>
            {}
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block' }}>
                <div>
                  <div style={{ margin: '0px auto' }}>
                    <div style={{ display: 'inline-block' }}>
                      <Animated animationIn="rollIn" isVisible={true}>
                        <ActionLabel color={muiStyle.palette.primary1Color} />
                      </Animated>
                    </div>
                    <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                      <DatePicker
                        autoOk={true}
                        floatingLabelText={t('common:startDate')}
                        shouldDisableDate={this.disableStartDate}
                        onChange={this.handleChangeStartDate}
                        value={this.state.startDate}
                        data-tip
                        data-for="click"
                      />
                      <ReactTooltip id="click" place="left" effect="solid">
                        <span>{t('common:clickEdit')}</span>
                      </ReactTooltip>
                    </div>
                  </div>
                  <div style={{ margin: '0px auto' }}>
                    <div style={{ display: 'inline-block' }}>
                      <Animated animationIn="rollIn" isVisible={true}>
                        <ActionLabel color={muiStyle.palette.primary1Color} />
                      </Animated>
                    </div>
                    <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                      <Animated animationIn="flash" isVisible={true}>
                        <DatePicker
                          autoOk={true}
                          floatingLabelText={t('common:endDate')}
                          onChange={this.handleChangeEndDate}
                          value={this.state.endDate}
                          shouldDisableDate={this.disableEndDate}
                          data-tip
                          data-for="click"
                        />
                      </Animated>
                      <ReactTooltip id="click" place="left" effect="solid">
                        <span>{t('common:clickEdit')}</span>
                      </ReactTooltip>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'inline-block' }}>
                <Hints
                  increaseDay={this.state.increaseDay}
                  availableNumber={this.state.availableNumber.length}
                  currentInstanceNum={this.props.currentInstanceNum}
                />
              </div>
            </div>
            <ReviewCalendar />
          </div>
        );
      case 1:
        return (
          <div>
            <ProjectCode
              ProjectNum={this.ChangeProjectNum}
              selectprojectNum={this.state.selectprojectNum}
            />
            <SelectField
              floatingLabelText={t('common:InstanceNum')}
              floatingLabelStyle={{ color: orangeA700 }}
              value={this.state.instanceNum}
              onChange={this.handleInstanceNumChange}
              disabled={true}
              style={{ display: 'none' }}
            >
              {false &&
                this.state.availableNumber.map(data => (
                  <MenuItem
                    key={data.num + 1}
                    value={data.num + 1}
                    primaryText={data.num + 1}
                  />
                ))}
              <MenuItem key={1} value={1} primaryText={1} />
            </SelectField>
            <br />
            {this.state.instanceArr.map((instance, index) => (
              <Card
                initiallyExpanded={true}
                style={{
                  borderRadius: '5px',
                  border: '1px solid #e0e0e0',
                  margin: '2px',
                }}
              >
                <CardHeader
                  title={<b>Instance - {index}</b>}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <Divider />
                <CardText expandable={true}>
                  {}
                  {this.renderSelectImage(instance, index)}
                </CardText>
                {}
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div>
            {loadingCreate ? (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress
                  size={80}
                  color={muiStyle.palette.primary1Color}
                  thickness={5}
                />
              </div>
            ) : (
              <ConfirmPage
                increaseDay={this.state.increaseDay}
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                instanceArr={this.state.instanceArr}
                imageArr={this.state.imageArr}
                projectNum={this.state.projectNum}
              />
            )}
          </div>
        );
      default:
        return 'Fly Me To The Moon';
    }
  }
  getImageApi = () => {
    axios
      .get(ApiGetImage, { headers: { Accept: 'application/json' } })
      .then((result) => {
        let imageFilter = [];
        // filter the image with disable tag
        imageFilter = result.data.images.filter(obj => !obj.label.match(/disable/gi));
        // default tensorflow on first position
        imageFilter.map((obj, index) => {
          if (obj.name.match(/tensorflow/gi)) {
            const tmp = obj;
            imageFilter[index] = imageFilter[0];
            imageFilter[0] = tmp;
            // console.log(imageFilter);
          }
          return 0;
        });
        this.setState({ imageArr: imageFilter });
        return 0;
      })
      .catch((err) => {
        console.log(err);
        this.props.errorNotify('ERROR : Image');
      });
  };
  createApi = () => {
    console.table(this.state.instanceArr);
    // this.dummyAsync2(() => this.setState({
    //   finished: true,
    // }))
    console.log(this.props.token);
    console.table(
      moment(this.state.startDate).format('YYYY-MM-DD'),
      moment(this.state.endDate).format('YYYY-MM-DD'),
      this.state.imageArr[this.state.instanceArr[0].image].id,
      this.state.instanceArr[0].machineObj.id,
    );
    // console.log(moment(this.state.startDate).format('YYYY-MM-DD'))
    // console.log(moment(this.state.endDate).format('YYYY-MM-DD'))
    fetch(ApiCreateSchedule, {
      method: 'post',
      headers: {
        'x-access-token': this.props.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        start: moment(this.state.startDate).format('YYYY-MM-DD'),
        end: moment(this.state.endDate).format('YYYY-MM-DD'),
        imageId: this.state.imageArr[this.state.instanceArr[0].image].id,
        // machineId: this.state.instanceArr[0].machineObj.id,
      }),
      // body:data
    })
      .then((response) => {
        // console.log(response)
        if (response.ok) {
          this.dummyAsync2(() => this.setState({ finished: true }));
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        console.log(data.code);
        if (data.code === '401' || data.code === 401) {
          this.props.errorNotify('ERROR : ' + data.message);
          this.props.errorNotify('Please, pick another date.');
          this.setState({
            stepIndex: 0,
            loadingCreate: false,
          });
          // GA
          ReactGA.event({
            category: 'CreatePage',
            action: 'createSchedule',
            label: 'Failed 401',
          });
        } else if (data.code === '500' || data.code === 500) {
          this.props.errorNotify('ERROR : ' + data.message);
          // this.props.errorNotify('Please, pick another date.')
          this.setState({
            stepIndex: 0,
            loadingCreate: false,
          });
          // GA
          ReactGA.event({
            category: 'CreatePage',
            action: 'createSchedule',
            label: 'Failed 500',
          });
        } else {
          this.setState({
            createdRespData: data,
          });
          // GA
          ReactGA.event({
            category: 'CreatePage',
            action: 'createSchedule',
            label: 'Success',
          });
        }
      })
      .catch((err) => {
        console.log('err:' + err);
        this.props.errorNotify('ERROR : Create Schedule');
        // GA
        ReactGA.event({
          category: 'CreatePage',
          action: 'createSchedule',
          label: 'Failed',
        });
      });
  };
  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 450);
    });
  };
  dummyAsync2 = (cb) => {
    this.setState({ loadingCreate: true }, () => {
      this.asyncTimer = setTimeout(cb, 450);
    });
  };
  handleNext = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      if (stepIndex === 2) {
        this.setState({ loadingCreate: true });
        this.createApi();
      } else {
        this.dummyAsync(() =>
          this.setState({
            loading: false,
            stepIndex: stepIndex + 1,
            // finished: stepIndex >= 2,
          }),
        );
      }
    }
  };
  handlePrev = () => {
    const { stepIndex } = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() =>
        this.setState({
          loading: false,
          stepIndex: stepIndex - 1,
        }),
      );
    }
  };
  handleGpuChange = (event, index, value) => {
    console.log('handleGpuChange', event, index, value);
    this.setState({ gpu: value });
  };
  handleGpuNumberChange = (event, index, value) => {
    console.log('handleGpuNumberChange', event, index, value);
    this.setState({ gpuNumber: value });
  };
  handleInstanceNumChange = (event, index, value) => {
    let arr = [];
    for (let i = 0; i < value; i += 1) {
      const obj = {
        instance: this.state.availableNumber[i].instance,
        image: 0,
        imageDesc: this.state.imageArr[0].description,
        machine: 0,
        machineObj: this.state.availableMachines[0],
      };
      arr.push(obj);
    }
    this.setState({
      instanceNum: value,
      instanceArr: arr,
    });
  };
  handleChangeStartDate = (event, date) => {
    this.setState({
      startDate: date,
      increaseDay: moment(this.state.endDate).diff(moment(date), 'days'),
    });
    if (this.state.endDate != null) this.checkInstanceRemain();

    //  GA
    ReactGA.event({
      category: 'CreatePage',
      action: 'selectStartDate',
      label: moment(date).format('YYYY-MM-DD'),
    });
  };
  handleChangeEndDate = (event, date) => {
    const startDate = moment(this.state.startDate).format('YYYY-MM-DD');
    const endDate = moment(date).format('YYYY-MM-DD');
    // console.log('handleChangeEndDate:'+moment(endDate).diff(moment(startDate), 'days'))
    // console.log('handleChangeEndDate-Startdate:'+moment(startDate).format('YYYY-MM-DD'))
    // console.log('handleChangeEndDate-Enddate:'+moment(endDate).format('YYYY-MM-DD'))

    this.setState({
      endDate: date,
      increaseDay: moment(endDate).diff(moment(startDate), 'days'),
    });
    this.checkInstanceRemain();

    // GA
    ReactGA.event({
      category: 'CreatePage',
      action: 'selectEndDate',
      label: endDate,
    });
  };
  checkInstanceRemain = async () => {
    console.log('checkInstanceRemain');
    const { startDate, endDate } = this.state;

    const machines = await axios
      .get(ApiGetMachine, {
        headers: { Accept: 'application/json' },
      })
      .then(result => result.data.machines)
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        this.props.errorNotify(err.response.data.message);
      });

    const avilMachine = await axios
      .get(ApiCheckInstance, {
        headers: { Accept: 'application/json' },
        params: {
          end: moment(endDate).format('YYYY-MM-DD'),
          start: moment(startDate).format('YYYY-MM-DD'),
        },
      })
      .then((result) => {
        let avalableNum = [];
        let number;
        console.log(result.data);
        if (result.data.availableNumber <= 3 - this.props.currentInstanceNum) {
          number = result.data.availableNumber;
        } else {
          number = 3 - this.props.currentInstanceNum;
        }
        for (let i = 0; i < number; i += 1) {
          const obj = { num: i, instance: result.data.machines[i] };
          avalableNum.push(obj);
        }
        this.setState({
          queryNumber: result.data.availableNumber,
          submitting: false,
          availableNumber: avalableNum,
          instanceArr: [
            {
              instance: result.data.machines[0],
              image: 0,
              // imageDesc: this.state.imageArr[0].description,
              imageDesc:
                this.state.imageArr[0].name +
                '-' +
                this.state.imageArr[0].label,
              machine: 0,
              machineObj: machines[0],
            },
          ],
        });
        console.log(
          'queryNumber',
          result.data.availableNumber,
          'availableNumber',
          avalableNum.length,
          'currentInstanceNum',
          this.props.currentInstanceNum,
        );
        return result.data.machines;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        this.props.errorNotify(err.response.data.message);
      });

    // console.log(avilMachine)
    // console.log(machines)
    const availableMachines = machines.filter(obj => (avilMachine.find(res => res === obj.id)));
    console.log(availableMachines);
    this.setState({ availableMachines });
  };
  handleChangeProjectNum = (event, value) => this.setState({ projectNum: value });
  disableStartDate = date => moment(date).isBefore(moment().add(-1, 'days'));
  disableEndDate = date =>
    moment(date).isBefore(moment(this.state.startDate)) ||
    moment(date).isAfter(moment(this.state.startDate).add(1, 'month'));

  imageSelect = (instance, index, image) => {
    console.log(instance, index, image);
    // const imageArr = this.state.imageArr
    let instanceArr = this.state.instanceArr;
    console.log(instanceArr);
    console.log(this.state.imageArr[image].description);
    instanceArr[instance].image = image;
    // instanceArr[instance].imageDesc = this.state.imageArr[image].description
    instanceArr[instance].imageDesc =
      this.state.imageArr[image].name + '-' + this.state.imageArr[image].label;
    this.setState({ instanceArr });
    // GA
    ReactGA.event({
      category: 'CreatePage',
      action: 'selectImage',
      label: this.state.imageArr[image].name,
    });
  };
  machineSelect = (instanceIndex, index, machineIndex) => {
    console.log(instanceIndex, index, machineIndex);
    console.log(this.state.instanceArr);
    const availableMachines = this.state.availableMachines;
    let instanceArr = this.state.instanceArr;

    instanceArr[instanceIndex].machine = machineIndex;
    instanceArr[instanceIndex].machineObj = availableMachines[machineIndex];
    this.setState({ instanceArr });
    console.log(this.state.instanceArr);
  };
  gpuSelect = (event, index, value) => this.setState({ gpuType: value });
  ChangeProjectNum = (value, selectValue) => {
    this.setState({
      projectNum: value,
      selectprojectNum: selectValue,
    });
  };
  CreateDone = () => {
    this.props.refresh();
    this.props.switchReview();
  };
  renderSelectGpuWithNum = () => {
    const { t } = this.props;
    const gpuItems = [
      <MenuItem key={1} value={'1080'} primaryText="1080" />,
      <MenuItem key={2} value={'p100'} primaryText="p100" />,
    ];
    const gpuNumber = [
      <MenuItem key={1} value={2} primaryText="2" />,
      <MenuItem key={2} value={4} primaryText="4" />,
    ];
    return (
      <div style={{ margin: '0px auto' }}>
        <div style={{ display: 'inline-block' }}>
          <div>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                <SelectField
                  floatingLabelText={t('common:gpuType')}
                  onChange={this.handleGpuChange}
                  value={this.state.gpu}
                >
                  {gpuItems}
                </SelectField>
              </div>
            </div>
            <div style={{ margin: '0px auto' }}>
              <div style={{ display: 'inline-block' }}>
                <Animated animationIn="rollIn" isVisible={true}>
                  <ActionLabel color={muiStyle.palette.primary1Color} />
                </Animated>
              </div>
              <div style={{ display: 'inline-block', marginLeft: '3px' }}>
                <SelectField
                  floatingLabelText={t('common:gpuNumber')}
                  onChange={this.handleGpuNumberChange}
                  value={this.state.gpuNumber}
                >
                  {gpuNumber}
                </SelectField>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  renderSelectGpu = () => {
    const { t } = this.props;
    return (
      <div style={{ margin: '0px auto' }}>
        <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
          <Animated animationIn="rollIn" isVisible={true}>
            <ActionLabel color={muiStyle.palette.primary1Color} />
          </Animated>
        </div>
        <div style={{ display: 'inline-block' }}>
          <SelectField
            floatingLabelText={
              'GPU'
            }
            onChange={this.gpuSelect}
            value={this.state.gpuType}
          >
            {gpuTypeList.map((gpu, index) => (
              <MenuItem
                key={index}
                value={gpu}
                primaryText={gpu}
              />
            ))}
          </SelectField>
        </div>
      </div>
    );
  }
  renderSelectImage = (instance, index) => {
    const { t } = this.props;
    return (
      <div>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div style={{ display: 'inline-block' }}>
            <SelectField
              key={instance.instance}
              floatingLabelText={
                'Instance ' + index + ' ' + t('common:instanceImage')
              }
              onChange={this.imageSelect.bind(null, index)}
              value={instance.image}
            >
              {this.state.imageArr.map((image, index) => (
                <MenuItem
                  key={image.id}
                  value={index}
                  primaryText={image.name}
                />
              ))}
            </SelectField>
          </div>
        </div>
        <br />
        <div>
          <Card>
            <CardHeader
              subtitle={
                <p>
                  {this.state.imageArr[instance.image].name} -{' '}
                  {t('common:imageDesc')}
                </p>
              }
            />
            <CardText>{instance.imageDesc}</CardText>
          </Card>
        </div>
      </div>
    );
  };
  renderSelectMachines = (instance, index) => {
    const { t } = this.props;
    const textCenter = { textAlign: 'center' };
    console.log(instance.machine);
    return (
      <div>
        <div style={{ margin: '0px auto' }}>
          <div style={{ display: 'inline-block', verticalAlign: 'super' }}>
            <Animated animationIn="rollIn" isVisible={true}>
              <ActionLabel color={muiStyle.palette.primary1Color} />
            </Animated>
          </div>
          <div style={{ display: 'inline-block' }}>
          <SelectField
            key={instance.instance}
            floatingLabelText={
              'Instance ' + index + ' ' + t('common:instanceMachine')
            }
            onChange={this.machineSelect.bind(null, index)}
            value={instance.machine}
          >
            {this.state.availableMachines.map((machine, index) => (
              <MenuItem
                key={machine.id}
                value={index}
                primaryText={machine.name}
              />
            ))}
          </SelectField>
          </div>
        </div>
        <br />
        <div>
          <Card>
            <CardText>
              <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn style={textCenter}>
                      {
                        <font color="#000">
                          <b>{'ID'}</b>
                        </font>
                      }
                    </TableHeaderColumn>
                    <TableHeaderColumn style={textCenter}>
                      {
                        <font color="#000">
                          <b>{'GPUType'}</b>
                        </font>
                      }
                    </TableHeaderColumn>
                    <TableHeaderColumn style={textCenter}>
                      {
                        <font color="#000">
                          <b>{'Name'}</b>
                        </font>
                      }
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  <TableRow>
                    <TableRowColumn style={textCenter}>
                      {
                        <p>
                          <b>{instance.machineObj.id}</b>
                        </p>
                      }
                    </TableRowColumn>
                    <TableRowColumn style={textCenter}>
                      {
                        <p>
                          <b>{instance.machineObj.gpuType}</b>
                        </p>
                      }
                    </TableRowColumn>
                    <TableRowColumn style={textCenter}>
                      {
                        <p>
                          <b>{instance.machineObj.name}</b>
                        </p>
                      }
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </CardText>
          </Card>
        </div>        
      </div>
    );
  };
  renderContent() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };
    const { t } = this.props;
    if (finished) {
      return (
        <div style={contentStyle}>
          <List>
            <Divider />
            <FinishAutoPage CreateDone={this.CreateDone} />
            <Divider />
            <RaisedButton
              label={t('common:backReview')}
              backgroundColor={muiStyle.palette.primary1Color}
              icon={<ImageViewComfy color="white" />}
              labelColor={white}
              onTouchTap={this.CreateDone}
            />
          </List>
        </div>
      );
    }
    let nextBtnDisable = false;
    switch (stepIndex) {
      case 0:
        nextBtnDisable =
          this.state.increaseDay <= 0 ||
          this.state.increaseDay > 31 ||
          this.state.endDate === null ||
          this.state.availableNumber.length === 0;
        break;
      default:
        break;
      // case 1:
      //   this.state.instanceArr.map((instance)=>{
      // nextBtnDisable = (instance.dataSet === true &&
      // (instance.dataSetPath.length === 0 ||
      // instance.dataSetId.length === 0 ||
      // instance.dataSetPass.length === 0))
      //   })
      //   break
    }
    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{ marginTop: 24, marginBottom: 12 }}>
          <FlatButton
            label={t('common:createStep.back')}
            disabled={stepIndex === startStep || this.state.loadingCreate}
            onTouchTap={this.handlePrev}
            style={{ marginRight: 12 }}
          />
          <RaisedButton
            label={
              stepIndex === 2 ? (t('common:createStep.create')) : (t('common:createStep.next'))
            }
            backgroundColor={muiStyle.palette.primary1Color}
            labelColor={white}
            disabled={nextBtnDisable || this.state.loadingCreate}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }
  render() {
    const { loading, loadingCreate, stepIndex, finished } = this.state;
    const { t } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card>
          <CardActions
            style={{
              zIndex: 2,
              display: 'inline-block',
              float: 'right',
              right: '10px',
            }}
          >
            <FlatButton
              label={t('common:specialOrder')}
              style={
                finished ? (
                  { color: 'white' }
                ) : (
                  { color: muiStyle.palette.primary1Color }
                )
              }
              icon={<CommunicationContactMail />}
              disabled={finished}
              href={'mailto:eNgiNEer@No.oNe.cARe'}
              data-tip
              data-for="mailto"
            />
            <ReactTooltip id="mailto" place="bottom" effect="solid">
              <span>{t('common:mailto')}</span>
            </ReactTooltip>
            <FlatButton
              label={t('common:backReview')}
              style={
                loadingCreate ? (
                  { color: 'white' }
                ) : (
                  { color: muiStyle.palette.primary1Color }
                )
              }
              icon={<ImageViewComfy />}
              disabled={loadingCreate}
              onTouchTap={this.props.switchReview}
            />
            <FlatButton
              label={t('common:backReview')}
              style={
                !finished ? (
                  { display: 'none' }
                ) : (
                  { color: muiStyle.palette.primary1Color }
                )
              }
              icon={<ImageViewComfy />}
              disabled={!finished}
              onTouchTap={this.CreateDone}
            />
          </CardActions>
          <CardTitle title={t('common:create')} />
          <div style={{ width: '100%', maxWidth: '55%', margin: 'auto' }}>
            <Stepper activeStep={stepIndex}>
              <Step>
                <StepLabel>{t('common:createStep.step1')}</StepLabel>
              </Step>
              <Step>
                <StepLabel>{t('common:createStep.step2')}</StepLabel>
              </Step>
              <Step>
                <StepLabel>{t('common:createStep.step4')}</StepLabel>
              </Step>
            </Stepper>
            <ExpandTransition loading={loading} open={true}>
              {this.renderContent()}
            </ExpandTransition>
          </div>
        </Card>
      </MuiThemeProvider>
    );
  }
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators({ errorNotify, copyNotify }, dispatch);
}
export default connect(null, matchDispatchToProps)(translate('')(CreatePage));
