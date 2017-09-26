import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import 'semantic-ui-css/components/label.min.css';
// i18n
import { translate } from 'react-i18next';
/**
  Show GPU Type
  Example:
  ```
  <GpuHandler gpu={data.instance.machine.gpuType} />
  ```
 */
class GpuHandler extends Component {
  static propTypes = {
    /**
     GPUType of the instance
    */
    gpu: React.PropTypes.string.isRequired,
  };
  static defaultProps = {
    gpu: '5850',
  };
  render() {
    return (
      <div>
        <Label color={'brown'}>{this.props.gpu}</Label>
      </div>
    );
  }
}
export default translate('')(GpuHandler);
