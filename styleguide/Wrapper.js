import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from '../src/app/components/reducers';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import i18n from '../src/app/utils/i18n';
import { I18nextProvider } from 'react-i18next';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
})
const logger = createLogger();
const configureStore = createStore(
    reducer,
    applyMiddleware(thunk, promise, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for redux dev tool
);

export default class Wrapper extends Component {
  render() {
    return (
      <Provider store={configureStore}>
        <I18nextProvider i18n={ i18n } >
          <MuiThemeProvider muiTheme={muiTheme}>
            {this.props.children}
          </MuiThemeProvider>
        </I18nextProvider>
      </Provider>
    );
  }
}