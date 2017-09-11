import React, { Component, PropTypes } from 'react'
import { Label } from 'semantic-ui-react'
import 'semantic-ui-css/components/label.min.css'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../utils/i18n'
/**
  Show GPU Type
  Example:
  ```
  <GpuHandler gpu={data.instance.machine.gpuType} />
  ```
 */
class GpuHandler extends Component {
	
	constructor(props) {
      super(props)
    }
    static propTypes = {
	  /**
	    GPUType of the instance 
	  */
	  gpu: React.PropTypes.string.isRequired,
	}
	static defaultProps = {
        gpu: '5850',        
    }	
	render(){
		const {statusId} = this.props
		return(
			<div><Label color={'brown'}>{this.props.gpu}</Label></div>
		)
	}
}
export default translate('')(GpuHandler)