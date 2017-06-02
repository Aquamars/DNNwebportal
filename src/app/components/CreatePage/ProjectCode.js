import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ReactTooltip from 'react-tooltip'
// i18n
import { translate, Interpolate } from 'react-i18next'
import i18n from '../../utils/i18n'
// COLOR
import { orange500, orangeA700 } from 'material-ui/styles/colors'

import VirtualizedSelect from 'react-virtualized-select'
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import styles from '../../style/VirtualizedSelect.css'

import { project2017 } from '../../resource'

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestionValue(suggestion) {
  // return suggestion.text;
  return suggestion.code
}

function renderSuggestion(suggestion) {
  // return (
  //   <span>{suggestion.name}</span>
  // );

  return (
    <span>{suggestion.code}-{suggestion.name}</span>
  );
}

function renderSectionTitle(section) {
  // return (
  //   <strong>{section.title}</strong>
  // );
  return (
    <strong>{section.unit}</strong>
  );
}

function getSectionSuggestions(section) {
  // return section.languages;
  return section.project;
}

class ProjectCode extends React.Component {
	constructor(props) {
	  super(props)

	  this.state = {
	    value: '',
	    suggestions: [],
	    select: null,
      selectValue:''
	  }
    if(this.props.selectprojectNum != null){
      this.state = {
        selectValue:this.props.selectprojectNum
      }
    }
	}

  handleChange = (event, index, value) => {
    // console.log(index, value)
    this.setState({
      select:index,
      selectValue:''
    })
  }
  OptionRenderer = ({ focusedOption, focusedOptionIndex, focusOption, key, labelKey, option, options, selectValue, style, valueArray }) => {
    const classNames = [styles.countryOption]
    let styleSelect
    if (option === focusedOption) {
      classNames.push(styles.countryOptionFocused)
      styleSelect = 'countryOptionFocused'
    }
    if (valueArray.indexOf(option) >= 0) {
      classNames.push(styles.countryOptionSelected)
      styleSelect = 'countryOptionSelected'
    }
    // console.log(styleSelect)
    return (
      <div
        className={styleSelect}
        key={key}
        onClick={() => selectValue(option)}
        onMouseOver={() => focusOption(option)}
        style={style}
      >
        <label className={styles.countryLabel}>
          {option.label}
        </label>
      </div>
    )
  }
  setproject = (selectValue) => {
    let project = selectValue.value.split(',')
    this.props.ProjectNum(project[0], selectValue)
    this.setState({ selectValue })
  }
	render(){
		const { value, suggestions } = this.state
    const {t} = this.props 
		return (
		  <div>
        <div style={{display:'inline-block'}}>
        <SelectField
          floatingLabelText={t('common:department')}
          floatingLabelStyle={{color: orangeA700}}
          value={this.state.select}
          onChange={this.handleChange}
        >
          {project2017.map((type, index)=>(
              <MenuItem value={index} primaryText={type.unit} />
            ))}
        </SelectField>
        </div>
        <div style={{display:'inline-block', width:'50%', verticalAlign:'super'}}>
        {
          this.state.select != null &&
          <div>
          <div data-tip data-for='select'>
          <VirtualizedSelect
            options={project2017[this.state.select].project}
            optionRenderer={this.OptionRenderer}
            clearable={true}
            placeholder={'Input & Search'}
            onChange={this.setproject}
            value={this.state.selectValue}            
          />
          </div>
          <ReactTooltip id='select' place="right" effect='solid'>
            <span>{t('common:searchSelect')}</span>
          </ReactTooltip>
          </div>
        }
        </div>
        {this.state.selectValue && <p><b>{t('common:project')} : {this.state.selectValue.value}</b></p>}
      </div>
		)
	}
}
export default translate('')(ProjectCode)