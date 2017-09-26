import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import Main from './Main'; // Our custom react component
import reducer from './components/reducers';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
// render(
// <AppContainer>
//  <I18nextProvider i18n={ i18n }>
//  <Main />
// </I18nextProvider>
// </AppContainer>,
// document.getElementById('app')
// );
const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(), // for redux dev tool
);

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <I18nextProvider i18n={i18n}>
          <Component />
        </I18nextProvider>
      </AppContainer>
    </Provider>,
    document.getElementById('app'),
  );
};

render(Main);

// if (module.hot) {
//   module.hot.accept('./Main', () => { render(Main) })
// }

console.log('module.hot:' + module.hot);

if (module.hot) {
  module.hot.accept('./Main', () => {
    const NextApp = require('./Main').default;
    render(NextApp);
  });
}

// if(module.hot) {
//     module.hot.accept();
// }
