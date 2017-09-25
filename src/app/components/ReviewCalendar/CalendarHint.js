import React from 'react';
// ICON
import FaSquare from 'react-icons/lib/fa/square';
// i18n
import { translate } from 'react-i18next';

class CalendarHint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hintsAry: this.props.hints,
    };
    console.log('CalendarHint', this.props.hints);
  }
  render() {
    return (
      <div style={{ textAlign: 'center', margin: '0px auto' }}>
        {this.state.hintsAry.map(hint => (
          <div style={{ color: hint.color, display: 'inline-block' }}>
            <span>
              <FaSquare />
              <font color={'black'}>
                :{hint.text}
                {'\u00A0'}
              </font>
            </span>
          </div>
        ))}
      </div>
    );
  }
}
export default translate('')(CalendarHint);
